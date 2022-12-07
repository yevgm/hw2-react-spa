import React, {useEffect} from 'react';
import './App.css';
import { Header } from './components/header';
import { PageLayout } from './components/Pages/PageLayout';
import { Pokemon } from './types';
import {addRandomPokemon} from "./components/Pages/YourPokemons/addRandomPokemon";

function App() {

    const [characters, setCharacters] = React.useState<Pokemon[]>([]);
    const [page, setPage] = React.useState<number>(0);
    const [gameLoaded, setGameLoaded] = React.useState<boolean>(false);
    const [BattlePokemon, setBattlePokemon] = React.useState<Pokemon>();

    const changePage = (page: number) => {
        setPage(page);
    }
    const PrepareToBattle = (chosenPokemon: Pokemon) => {
        setBattlePokemon(chosenPokemon);
        changePage(1);
    }

    // GET 3 random Pokemons at the beginning of the game
    useEffect(() => {
        let initialPokemons: number = 3;
        let newCharactersList: any = [];
        (async () => {
            for (let i = 0; i < initialPokemons; i++) {
                let promise = addRandomPokemon()
                newCharactersList = [...newCharactersList, promise];
            }

            newCharactersList = await Promise.all(newCharactersList)
            setCharacters(newCharactersList);
            setGameLoaded(true)
        })();

    }, []);


  return (
    <div className="App">
        <Header page={page} characters={characters}></Header>
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
