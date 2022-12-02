import React from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';
import { PokemonCard } from './PokemonCard';

export interface PokemonInfoProps {
    chosenPokemon: Pokemon|undefined,
}

export const PokemonInfo: React.FC<PokemonInfoProps> = ({
    chosenPokemon,
}) => {
    let pokemon_name;
    if (chosenPokemon){
        pokemon_name = chosenPokemon.name
        pokemon_name = pokemon_name.charAt(0).toUpperCase() + pokemon_name.slice(1);
    }

    return (
        <div className='info-container'>
            {   chosenPokemon !== undefined ?
                <>
                    <p className={'big-name'}>{pokemon_name}</p>
                    <ul>
                        <li>Type: {chosenPokemon.type}</li>
                        <li>Height: {chosenPokemon.height}</li>
                        <li>Weight: {chosenPokemon.weight}</li>
                    </ul>
                    <h3>Stats: </h3>
                    <ul>
                        <li>Hp: {chosenPokemon.hp}</li>
                        <li>Attack: {chosenPokemon.attack}</li>
                        <li>Defence: {chosenPokemon.defense}</li>
                        <li>Special Attack: {chosenPokemon.special_attack}</li>
                        <li>Special Defence: {chosenPokemon.special_defense}</li>
                        <li>Speed: {chosenPokemon.speed}</li>
                    </ul>

                </>
                :
                <h2 className={'no-left'}> No Pokemon selected! </h2>
            }
        </div>
    );
}