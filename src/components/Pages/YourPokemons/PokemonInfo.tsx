import React from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';
import { PokemonCard } from './PokemonCard';
import {NameToUpper} from "../../../utils";

export interface PokemonInfoProps {
    chosenPokemon: Pokemon|undefined,
    setBattlePokemon(newPage: Pokemon): void;
}

export const PokemonInfo: React.FC<PokemonInfoProps> = ({
    chosenPokemon,
    setBattlePokemon
}) => {

    let pokemon_name;
    if (chosenPokemon) {
        pokemon_name = NameToUpper(chosenPokemon.name);
    }

    return (
        <div className='info-container'>
            {   chosenPokemon !== undefined ?
                <>
                    <div className={'pokemon-display-box'}>
                        <p className={'big-name pokemon-display-header'}>{pokemon_name}</p>
                        <img className='pokemon-image pokemon-display-item right-margin' src={chosenPokemon.image} alt={chosenPokemon.name} width="150" height="150" />
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
                    <button className='nav-button' onClick={() => setBattlePokemon(chosenPokemon)}>I Choose You!</button>
                </>

                :
                <h2 className={'no-left'}> No Pokemon selected! </h2>
            }
        </div>
    );
}