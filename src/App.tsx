import React, {useEffect} from 'react';
import './App.css';
import { Header } from './components/header';
import { PageLayout } from './components/Pages/PageLayout';
import { Pokemon } from './types';

function App() {

    const [characters, setCharacters] = React.useState<Pokemon[]>([]);
    const [page, setPage] = React.useState<number>(0);


    const changePage = (newPage: number) => {
        setPage(newPage);
    }

  return (
    <div className="App">
        <Header page={page} characters={characters}></Header>
        <PageLayout page={page} characters={characters} setCharacters={setCharacters} setPage={changePage} />
    </div>
  );
}

export default App;
