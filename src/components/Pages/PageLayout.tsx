import React from 'react';
import '../../App.css';
import { Pokemon } from '../../types';
import { YourPokemons } from './YourPokemons/YourPokemons';
import { Battle } from './Battle/battle';


export interface PageLayoutProps {
    page: number;
    characters: Pokemon[];
    setCharacters: React.Dispatch<React.SetStateAction<Pokemon[]>>;
    setPage(newPage: number): void;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
      page,
      characters,
      setCharacters,
      setPage,
}) => {

    switch(page) {
        case 0:
            return <YourPokemons characters={characters} setCharacters={setCharacters} setPage={setPage}/>
        case 1:
            return <Battle />
        default:
            return null;

    }
}