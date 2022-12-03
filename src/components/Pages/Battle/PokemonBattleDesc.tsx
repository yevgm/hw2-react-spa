import React, {SetStateAction} from 'react';
import {Pokemon, PokemonMove} from "../../../types";

export interface PokemonBattleDescProps {
    chosenPokemon: Pokemon,
    setchosenMove: React.Dispatch<SetStateAction<PokemonMove|undefined>>|undefined
}

export const PokemonBattleDesc: React.FC<PokemonBattleDescProps> = ({
    chosenPokemon,
    setchosenMove
}) => {
    let pokemon_name;
    if (chosenPokemon){
        pokemon_name = chosenPokemon.name
        pokemon_name = pokemon_name.charAt(0).toUpperCase() + pokemon_name.slice(1);
    }

    const handleMoveClick = (move: PokemonMove) => {
        if (setchosenMove){
            setchosenMove(move)
        }
    }

    const SetClickable = () => {
        if (setchosenMove){
            return 'clickable'
        }
    }


    return (
        <div className='battle-info-container'>
            {
                chosenPokemon.moves.map(move =>
                    <div className={'pokemon-move-box'}>
                        <p className={SetClickable()} onClick={() => handleMoveClick(move)}>{move.name} ({move.power ? move.power : '0'})</p>
                    </div>
                )

            }
        </div>
    );
}