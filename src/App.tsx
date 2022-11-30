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
        // Think about validations... TODO remove
    }


  return (
    <div className="App">
        <Header></Header>
        <PageLayout page={page} characters={characters} setCharacters={setCharacters} />
    </div>
  );
}

export default App;
