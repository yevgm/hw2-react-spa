import React, {useEffect} from 'react';
import './App.css';
import { Header } from './components/header';
import { PageLayout } from './components/Pages/PageLayout';
import { Pokemon } from './types';
import {addRandomPokemon} from "./components/Pages/YourPokemons/addRandomPokemon";

function App() {

    const [characters, setCharacters] = React.useState<Pokemon[]>([]);
    const [page, setPage] = React.useState<number>(0);
    const [fetchStorage, setFetchStorage] = React.useState<boolean>(false);
    const [gameLoaded, setGameLoaded] = React.useState<boolean>(false);
    const [BattlePokemon, setBattlePokemon] = React.useState<Pokemon>();

    const changePage = (page: number) => {
        setPage(page);
    }
    const PrepareToBattle = (chosenPokemon: Pokemon) => {
        setBattlePokemon(chosenPokemon);
        changePage(1);
    }

    useEffect(() => {
        if (fetchStorage){
            localStorage.setItem('pokemons_container', JSON.stringify({'pokemon_container': characters}));
        }

    }, [characters]);

    useEffect(() => {
        const storage_out = localStorage.getItem('pokemons_container');
        let pokemons: {[key:string]: Pokemon[]} = {};
        if (storage_out !== null){
            pokemons =  JSON.parse(storage_out);
        }

        if (storage_out !== null && pokemons !== undefined && pokemons.pokemon_container.length > 0){
            // Load previous stored game state
            setCharacters(pokemons.pokemon_container);
        }
        else {
            // GET 3 random Pokemons at the beginning of the game
            let initialPokemons: number = 3;
            let newCharactersList: any = [];
            (async () => {
                for (let i = 0; i < initialPokemons; i++) {
                    let promise = addRandomPokemon();
                    newCharactersList = [...newCharactersList, promise];
                }

                newCharactersList = await Promise.all(newCharactersList);
                setCharacters(newCharactersList);
                setGameLoaded(true);
            })();
        }

        setFetchStorage(true);
    }, []);

    const handleRefreshGame = ()=> {
        localStorage.clear()
        window.location.reload();
    }

  return (
    <div className="App">
        <Header page={page} characters={characters} handleRefreshGame={handleRefreshGame}></Header>
        <PageLayout page={page}
                    changePage={changePage}
                    characters={characters}
                    setCharacters={setCharacters}
                    setBattlePokemon={PrepareToBattle}
                    BattlePokemon={BattlePokemon}
                    gameLoaded={gameLoaded}
        />
    </div>
  );
}

export default App;
