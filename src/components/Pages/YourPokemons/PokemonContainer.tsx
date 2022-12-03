import React from 'react';
import { SetStateAction } from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';
import { PokemonCard } from './PokemonCard';

export interface PokemonContainerProps {
    characters: Pokemon[],
    setChosenPokemon: React.Dispatch<SetStateAction<Pokemon|undefined>>
}

export const PokemonContainer: React.FC<PokemonContainerProps> = ({
    characters, setChosenPokemon
}) => {

    return (
        <div className='cards-container'>
            {   characters.length > 0 ?
                characters.map(character =>
                    <PokemonCard key={Math.random()} character={character} setChosenPokemon={setChosenPokemon}/>) :

                <h2 className={'no-left'}> You have lost all your Pokemons :(<br/> Refresh for a new game...</h2>
            }
        </div>
    );
}