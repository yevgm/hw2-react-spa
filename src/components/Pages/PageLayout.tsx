import React from 'react';
import '../../App.css';
import { Pokemon } from '../../types';
import { YourPokemons } from './YourPokemons/YourPokemons';
import { Battle } from './Battle/battle';


export interface PageLayoutProps {
    page: number;
    characters: Pokemon[];
    setCharacters: React.Dispatch<React.SetStateAction<Pokemon[]>>;
    setBattlePokemon(chosenPokemon: Pokemon): void;
    BattlePokemon: Pokemon|undefined;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
      page,
      characters,
      setCharacters,
      setBattlePokemon,
      BattlePokemon
}) => {

    switch(page) {
        case 0:
            return <YourPokemons characters={characters} setCharacters={setCharacters} setBattlePokemon={setBattlePokemon}/>
        case 1:
            return <Battle chosenPokemon={BattlePokemon}/>
        default:
            return null;

    }
}