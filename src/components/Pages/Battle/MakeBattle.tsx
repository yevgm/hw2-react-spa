import React, {SetStateAction, useEffect} from 'react';
import {Pokemon, PokemonMove, typeTable} from "../../../types";
import {NameToUpper} from "../../../utils";

export interface MakeBattleProps {
    chosenMove: PokemonMove|undefined,
    chosenPokemon: Pokemon|undefined,
    OpponentPokemon: Pokemon|undefined,
    setchosenMove: React.Dispatch<SetStateAction<PokemonMove|undefined>>,
    endBattle(result: string, objectivePokemon: Pokemon): void
}

export const MakeBattle: React.FC<MakeBattleProps> = ({
    chosenMove,
    chosenPokemon,
    OpponentPokemon,
    setchosenMove,
    endBattle
}) => {

    const [winner, setwinner ] = React.useState<string>();
    const [results, setResults ] = React.useState<[string, string]>();
    const [chosenMoveFlag, setChosenMoveFlag] = React.useState<boolean>(false);
    const [time, setTime] = React.useState<number>(4);

    useEffect(() => {
        if (!chosenMoveFlag && chosenMove && chosenPokemon && OpponentPokemon) {
            // Pick random opponent move
            let rand_index = Math.min(Math.ceil(Math.random() * 4), OpponentPokemon.pokemon_moves.length - 1);
            let bot_move: PokemonMove = OpponentPokemon.pokemon_moves[rand_index];
            // calculate TotalPower for both
            let player_tp: number = CalculateTotalPower(chosenMove, chosenPokemon, OpponentPokemon);
            let bot_tp: number = CalculateTotalPower(bot_move, OpponentPokemon, chosenPokemon);
            // Choose winner
            let winner_:string = (bot_tp > player_tp)? 'bot' : 'player';
            // Set results
            setwinner(winner_)
            let playerDisplayString: string = chosenMove.name + ' : ' + player_tp;
            let botDisplayString: string = bot_move.name + ' : ' + bot_tp;
            setResults([playerDisplayString, botDisplayString])
            // Change state so no more moves are allowed
            setChosenMoveFlag(true);

        }
    }, [chosenMove]);

    React.useEffect(() => {
        if (chosenMove) {
            const timer = (time >= 0) && setTimeout(() => setTime(time - 1), 1000);
            let timeOutput = () => clearTimeout(timer ? timer : undefined);
            if (time === 0 && winner) {
                clearRound(winner);
            }
        }

    }, [time, winner]);


    const clearRound = (winner: string) => {
        if (winner === 'player' && OpponentPokemon){
            endBattle('player', OpponentPokemon)
        }
        else if (winner === 'bot' && chosenPokemon){
            endBattle('bot', chosenPokemon)
        }

        if (setwinner){
            setwinner(undefined)
        }

        if (setchosenMove){
            setchosenMove(undefined);
        }

        if (setResults){
            setResults(undefined)
        }
    }

    const CalculateTotalPower = (chosenMove_:PokemonMove,
                                 chosenPokemon_:Pokemon,
                                 OpponentPokemon_:Pokemon) => {
        let mp: number = chosenMove_.power
        let pa: number = parseInt(chosenPokemon_.attack);
        let pd: number = parseInt(OpponentPokemon_.defense);
        let tf: number = typeTable.getType(chosenPokemon_.type, OpponentPokemon_.type);
        return (mp + pa) * tf - pd;
    }

    return (
        <div className='make-battle-container-upper'>
            {(results && winner)?
                <div className='make-battle-container'>
                    <div className={'make-battle-container-item'}>
                        <h3 className={'player-results'}>You!</h3>
                        {chosenPokemon && chosenPokemon.image? <img className='pokemon-display-item' src={chosenPokemon.image} alt={chosenPokemon.name} width="150" height="150" />: null}
                        <h3 className={'player-results'}>{NameToUpper(results[0])}</h3>
                    </div>

                    <div className={'make-battle-container-item spread-column'}>
                        <h3 className={''}>--- Vs ---</h3>
                        <h2 className={'timer'}>{time <= 3 ? time : ' '}</h2>
                        {winner === 'player'? <h1 className={'player-results'}>You Won!!!</h1>: <h1 className={'player-results enlarge-blocks'}>You Lost :(</h1>}
                    </div>

                    <div className={'make-battle-container-item'}>
                        <h3 className={''}>Opponent!</h3>
                        {OpponentPokemon && OpponentPokemon.image? <img className='pokemon-display-item' src={OpponentPokemon.image} alt={OpponentPokemon.name} width="150" height="150" />: null}
                        <h3 className={''}>{NameToUpper(results[1])}</h3>
                    </div>

                </div>
                :
                <h1 className={'top-margin'}>Choose your move and fight!</h1>
            }
        </div>
    );
}
