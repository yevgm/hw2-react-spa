import React, {SetStateAction} from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';

export interface CharacterCardProps {
    character: Pokemon,
    setChosenPokemon: React.Dispatch<SetStateAction<Pokemon|undefined>>
}

export const PokemonCard: React.FC<CharacterCardProps> = ({
    character,
    setChosenPokemon
}) => {
    const { name, image } = character;
    const SetPokemonInfo = () => {
        setChosenPokemon(character)
    }

    return (                    
            <div className='card'>
                {image ? <img className='pokemon-image' src={image} alt={name} width="100" height="100" onClick={SetPokemonInfo} /> : null}
            </div>        
    );
}