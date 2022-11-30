import React from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';
import { CharacterCard } from './CharacterCard';

export interface PokemonContainerProps {
    characters: Pokemon[],
}

export const PokemonContainer: React.FC<PokemonContainerProps> = ({
    characters,
}) => {

    return (
        <div className='cards-container'>
            {   characters.length > 0 ?
                characters.map(character =>
                    <CharacterCard key={Math.random()} character={character}/>) :

                <h2> You have no Pokemons left! </h2>
            }
        </div>
    );
}