import React, {useEffect} from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';
import { PokemonContainer } from './PokemonContainer';
import {PokemonInfo} from "./PokemonInfo";


export interface YourPokemonsPageProps {
    characters: Pokemon[];
    setCharacters: React.Dispatch<React.SetStateAction<Pokemon[]>>;
}

export const YourPokemons: React.FC<YourPokemonsPageProps> = ({
     characters,
     setCharacters,
 }) => {

    const [chosenPokemon, setChosenPokemon] = React.useState<Pokemon>();

    // Draw random Pokemon from API
    const addRandomCharacter = async() => {
        const randomNumber = Math.floor(Math.random() * 151);
        let newCharacterFromApi;

        try {
            newCharacterFromApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`);
            newCharacterFromApi = await newCharacterFromApi.json();
        } catch (e) {
            console.error(e);
        }

        let newCharacter: Pokemon = {
            name: newCharacterFromApi.name,
            type: '',
            height: newCharacterFromApi.height,
            weight: newCharacterFromApi.weight,
            hp: '',
            attack: '',
            defense: '',
            special_attack: '',
            special_defense: '',
            speed: '',
            image: newCharacterFromApi.sprites.front_default,
        }
        for (let type of newCharacterFromApi.types) {
            newCharacter.type = type.type.name;
            break  // take only the first type
        }

        for (let stat of newCharacterFromApi.stats) {
            if (stat.stat.name === 'hp'){
                newCharacter.hp = stat.base_stat
            }
            else if (stat.stat.name === 'attack'){
                newCharacter.attack = stat.base_stat
            }
            else if (stat.stat.name === 'defense'){
                newCharacter.defense = stat.base_stat
            }
            else if (stat.stat.name === 'special-attack'){
                newCharacter.special_attack = stat.base_stat
            }
            else if (stat.stat.name === 'special-defense'){
                newCharacter.special_defense = stat.base_stat
            }
            else if (stat.stat.name === 'speed'){
                newCharacter.speed = stat.base_stat
            }

        }

        return newCharacter
    }

    useEffect(() => {
        let initialPokemons: number = 10;
        let newCharactersList: any = [];
        (async () => {
            for (let i = 0; i < initialPokemons; i++) {
                let promise = addRandomCharacter()
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
                    <PokemonInfo chosenPokemon={chosenPokemon}></PokemonInfo>
                </div>
            </div>
        </div>
    );
}