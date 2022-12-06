import React, {SetStateAction, useEffect} from 'react';
import {Pokemon, PokemonMove, typeTable} from "../../../types";

export interface MakeBattleProps {
    chosenMove: PokemonMove|undefined,
    chosenPokemon: Pokemon|undefined,
    OpponentPokemon: Pokemon|undefined,
    setchosenMove: React.Dispatch<SetStateAction<PokemonMove|undefined>>|undefined,
}

export interface FightProps {
    // chosenMove: PokemonMove,
    // chosenPokemon: Pokemon
}

export const MakeBattle: React.FC<MakeBattleProps> = ({
    chosenMove,
    chosenPokemon,
    OpponentPokemon,
    setchosenMove,
}) => {

    const [winner, setwinner ] = React.useState<string>();
    const [results, setResults ] = React.useState<[string, string]>();
    // const [BotMove, setBotMove ] = React.useState<PokemonMove>();

    useEffect(() => {
        if (chosenMove && chosenPokemon && OpponentPokemon) {
            // Pick random opponent move
            let rand_index = Math.ceil(Math.random() * 4);
            let bot_move: PokemonMove = OpponentPokemon?.moves[rand_index];
            // calculate TotalPower for both
            let player_tp: number = CalculateTotalPower(chosenMove, chosenPokemon, OpponentPokemon);
            let bot_tp: number = CalculateTotalPower(bot_move, OpponentPokemon, chosenPokemon);
            // Choose winner
            let winner_:string = (bot_tp > player_tp)? 'bot' : 'player';
            console.log(winner_)
            setwinner(winner_)
            let playerDisplayString: string = chosenMove.name + ' >>>> ' + player_tp;
            let botDisplayString: string = bot_move.name + ' >>>> ' + bot_tp;
            setResults([playerDisplayString, botDisplayString])

            // Finish the round
            // if (setchosenMove){
            //     setchosenMove(undefined);
            // }
        }
        }, [chosenMove]);


    const CalculateTotalPower = (chosenMove_:PokemonMove,
                                 chosenPokemon_:Pokemon,
                                 OpponentPokemon_:Pokemon) => {
        let mp: number = chosenMove_?.power;
        let pa: number = parseInt(chosenPokemon_?.attack);
        let pd: number = parseInt(OpponentPokemon_?.defense);
        let tf: number = typeTable.getType(chosenPokemon_.type, OpponentPokemon_.type);
        return (mp + pa) * tf - pd;
    }


    return (
        <div className='make-battle-container'>
            {/*<p>Test Battle</p>*/}
            {/*{*/}
            {/*    chosenPokemon.moves.map(move =>*/}
            {/*        <div className={'pokemon-move-box'}>*/}
            {/*            <p className={SetClickable()} onClick={() => handleMoveClick(move)}>{move.name} ({move.power ? move.power : '0'})</p>*/}
            {/*        </div>*/}
            {/*    )*/}

            {/*}*/}
            {(results && winner)?
                <>
                    <h3>{results[0]}</h3>
                    <h3>{results[1]}</h3>
                </>
                :
                <p>No move chosen</p>
            }
            {/*<Fight></Fight>*/}
        </div>
    );
}


export const Fight: React.FC<FightProps> = ({
  // chosenPokemon,
  // setchosenMove
}) => {


    return (
        <div className=''>
            <p className={'whiteColor'}>Test</p>
        </div>
    );
}