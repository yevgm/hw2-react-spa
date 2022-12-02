import React from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';
import { PokemonCard } from './PokemonCard';

export interface PokemonInfoProps {
    chosenPokemon: Pokemon|undefined,
    setPage(newPage: number): void;
}

export const PokemonInfo: React.FC<PokemonInfoProps> = ({
    chosenPokemon,
    setPage
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
                    <div className={'pokemon-display-box'}>
                        <p className={'big-name pokemon-display-header'}>{pokemon_name}</p>
                        <img className='pokemon-image pokemon-display-item' src={chosenPokemon.image} alt={chosenPokemon.name} width="150" height="150" />
                    </div>
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
                    <button className='nav-button' onClick={() => setPage(1)}>I Choose You!</button>
                </>

                :
                <h2 className={'no-left'}> No Pokemon selected! </h2>
            }
        </div>
    );
}