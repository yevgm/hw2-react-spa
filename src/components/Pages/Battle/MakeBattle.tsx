import React, {SetStateAction} from 'react';
import {Pokemon, PokemonMove} from "../../../types";

export interface MakeBattleProps {
    // chosenPokemon: Pokemon,
    // setchosenMove: React.Dispatch<SetStateAction<PokemonMove|undefined>>|undefined
}

export const MakeBattle: React.FC<MakeBattleProps> = ({
    // chosenPokemon,
    // setchosenMove
}) => {

    // const handleMoveClick = (move: PokemonMove) => {
    //     if (setchosenMove){
    //         setchosenMove(move)
    //     }
    // }
    //
    // const SetClickable = () => {
    //     if (setchosenMove){
    //         return 'clickable'
    //     }
    // }


    return (
        <div className='make-battle-container'>
            <p>Test Battle</p>
            {/*{*/}
            {/*    chosenPokemon.moves.map(move =>*/}
            {/*        <div className={'pokemon-move-box'}>*/}
            {/*            <p className={SetClickable()} onClick={() => handleMoveClick(move)}>{move.name} ({move.power ? move.power : '0'})</p>*/}
            {/*        </div>*/}
            {/*    )*/}

            {/*}*/}
        </div>
    );
}