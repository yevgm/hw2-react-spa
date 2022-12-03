import React, {useEffect} from 'react';
import './App.css';
import { Header } from './components/header';
import { PageLayout } from './components/Pages/PageLayout';
import { Pokemon } from './types';

function App() {

    const [characters, setCharacters] = React.useState<Pokemon[]>([]);
    const [page, setPage] = React.useState<number>(0);
    const [BattlePokemon, setBattlePokemon] = React.useState<Pokemon>();

    const changePage = (page: number) => {
        setPage(page);
    }
    const PrepareToBattle = (chosenPokemon: Pokemon) => {
        setBattlePokemon(chosenPokemon);
        changePage(1);
    }

  return (
    <div className="App">
        <Header page={page} characters={characters}></Header>
        <PageLayout page={page} characters={characters} setCharacters={setCharacters} setBattlePokemon={PrepareToBattle} BattlePokemon={BattlePokemon} />
    </div>
  );
}

export default App;
