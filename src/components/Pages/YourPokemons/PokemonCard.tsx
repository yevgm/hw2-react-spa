import React, {SetStateAction} from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';

export interface CharacterCardProps {
    character: Pokemon,
    chosenPokemon: Pokemon|undefined,
    setChosenPokemon: React.Dispatch<SetStateAction<Pokemon|undefined>>
}

export const PokemonCard: React.FC<CharacterCardProps> = ({
    character,
    chosenPokemon,
    setChosenPokemon
}) => {
    const { name, image } = character;
    const SetPokemonInfo = () => {
        if (chosenPokemon !== character){
            setChosenPokemon(character)
        }
        else{
            setChosenPokemon(undefined)
        }

    }

    return (                    
            <div className='card'>
                {image ? <img className='pokemon-image' src={image} alt={name} width="100" height="100" onClick={SetPokemonInfo} /> : null}
            </div>        
    );
}