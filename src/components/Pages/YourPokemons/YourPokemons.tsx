import React from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';
import { PokemonContainer } from './PokemonContainer';
import {PokemonInfo} from "./PokemonInfo";


export interface YourPokemonsPageProps {
    characters: Pokemon[],
    setBattlePokemon(newPage: Pokemon): void,
    gameLoaded: boolean,
}

export const YourPokemons: React.FC<YourPokemonsPageProps> = ({
         characters,
         setBattlePokemon,
         gameLoaded
 }) => {

    const [chosenPokemon, setChosenPokemon] = React.useState<Pokemon>();

    return (
        <div className='page-container'>
            <div className="page-col-left">
                <div className='page-leftside'>
                    <PokemonContainer
                        characters={characters}
                        chosenPokemon={chosenPokemon}
                        setChosenPokemon={setChosenPokemon}
                        gameLoaded={gameLoaded}
                    />
                </div>
            </div>
            <div className="vl"></div>
            <div className="page-col-right">
                <div className='page-rightside'>
                    <PokemonInfo chosenPokemon={chosenPokemon} setBattlePokemon={setBattlePokemon}></PokemonInfo>
                </div>
            </div>
        </div>
    );
}