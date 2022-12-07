import React, {SetStateAction} from 'react';
import {Pokemon, PokemonMove} from "../../../types";
import {NameToUpper} from "../../../utils";

export interface PokemonBattleDescProps {
    chosenPokemon: Pokemon,
    setchosenMove: React.Dispatch<SetStateAction<PokemonMove|undefined>>|undefined,
    fetchingData:boolean
}

export const PokemonBattleDesc: React.FC<PokemonBattleDescProps> = ({
    chosenPokemon,
    setchosenMove,
    fetchingData
}) => {

    const handleMoveClick = (move: PokemonMove) => {
        if (setchosenMove && !fetchingData){
            setchosenMove(move)
        }
    }

    const SetClickable = () => {
        if (setchosenMove){
            return 'clickable click-hover-text'
        }
    }


    return (
        <div className='battle-info-container'>
            {
                chosenPokemon.moves.map(move =>
                    <div className={'pokemon-move-box'} key={Math.random()}>
                        <p className={SetClickable()} onClick={() => handleMoveClick(move)}>{NameToUpper(move.name)} ({move.power ? move.power : '0'})</p>
                    </div>
                )

            }
        </div>
    );
}