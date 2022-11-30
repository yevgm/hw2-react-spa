import React, {useEffect} from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';
import { PokemonContainer } from './PokemonContainer';


export interface YourPokemonsPageProps {
    characters: Pokemon[];
    setCharacters: React.Dispatch<React.SetStateAction<Pokemon[]>>;
}

export const YourPokemons: React.FC<YourPokemonsPageProps> = ({
     characters,
     setCharacters,
 }) => {

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
            image: newCharacterFromApi.sprites.front_default,
        }


        // if (newCharacterFromApi && newCharacterFromApi?.name !== '') {
        //     newCharacter = {
        //         name: newCharacterFromApi.name,
        //         image: newCharacterFromApi.image,
        //     }
        //     const newCharactersList = [...characters, newCharacter];
        //     setCharacters(newCharactersList);

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
                    <PokemonContainer characters={characters}></PokemonContainer>
                </div>
            </div>
            <div className="vl"></div>
            <div className="page-col-right">
                <div className='page-rightside'>
                    <h2> You have no Pokemons left! </h2>
                    <h2> You have no Pokemons left! </h2>
                    <h2> You have no Pokemons left! </h2>
                    <h2> You have no Pokemons left! </h2>
                    <h2> You have no Pokemons left! </h2>
                    <h2> You have no Pokemons left! </h2>
                </div>
            </div>
        </div>
    );
}