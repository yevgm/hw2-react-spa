import React from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';

export interface CharacterCardProps {
    character: Pokemon,
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
    character,
}) => {

    const { name, image } = character;

    return (                    
            <div className='card'>
                {image ? <img className='pokemon-image' src={image} alt={name} width="100" height="100" /> : null}
            </div>        
    );
}