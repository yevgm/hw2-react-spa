import React from 'react';
import { SetStateAction } from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';
import { PokemonCard } from './PokemonCard';

export interface PokemonContainerProps {
    characters: Pokemon[],
    chosenPokemon: Pokemon|undefined,
    setChosenPokemon: React.Dispatch<SetStateAction<Pokemon|undefined>>,
    gameLoaded: boolean,
}

export const PokemonContainer: React.FC<PokemonContainerProps> = ({
    characters,
    chosenPokemon,
    setChosenPokemon,
    gameLoaded
}) => {

    return (
        <div className='cards-container'>
            {   characters.length > 0 ?
                characters.map(character =>
                    <PokemonCard key={Math.random()} character={character} chosenPokemon={chosenPokemon} setChosenPokemon={setChosenPokemon}/>) :
                gameLoaded?
                <h2 className={'no-left'}> You have lost all your Pokemons :(<br/> Refresh for a new game...</h2>:
                <h2 className={'no-left'}> Loading...</h2>
            }
        </div>
    );
}