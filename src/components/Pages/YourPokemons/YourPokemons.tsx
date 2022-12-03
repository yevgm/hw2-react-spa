import React, {useEffect} from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';
import { PokemonContainer } from './PokemonContainer';
import {PokemonInfo} from "./PokemonInfo";
import {addRandomPokemon} from "./addRandomPokemon";


export interface YourPokemonsPageProps {
    characters: Pokemon[];
    setCharacters: React.Dispatch<React.SetStateAction<Pokemon[]>>;
    setBattlePokemon(newPage: Pokemon): void;
}

export const YourPokemons: React.FC<YourPokemonsPageProps> = ({
     characters,
     setCharacters,
     setBattlePokemon
 }) => {

    const [chosenPokemon, setChosenPokemon] = React.useState<Pokemon>();

    // GET 3 random Pokemons at the beginning of the game
    useEffect(() => {
        let initialPokemons: number = 3;
        let newCharactersList: any = [];
        (async () => {
            for (let i = 0; i < initialPokemons; i++) {
                let promise = addRandomPokemon()
                newCharactersList = [...newCharactersList, promise];
            }

            newCharactersList = await Promise.all(newCharactersList)
            setCharacters(newCharactersList);
        })();

    }, []);


    return (
        <div className='page-container'>
            <div className="page-col-left">
                <div className='page-leftside'>
                    <PokemonContainer characters={characters} setChosenPokemon={setChosenPokemon}></PokemonContainer>
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