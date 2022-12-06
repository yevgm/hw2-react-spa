import React, {useEffect} from 'react';
import '../../../App.css';
import {Pokemon, PokemonMove} from "../../../types";
import {addRandomPokemon} from "../YourPokemons/addRandomPokemon";
import {PokemonBattleDesc} from "./PokemonBattleDesc";
import {MakeBattle} from "./MakeBattle";
import {NameToUpper} from "../../../utils";

export interface BattleProps {
    chosenPokemon: Pokemon|undefined,
}
export const Battle: React.FC<BattleProps> = ({
    chosenPokemon,
}) => {

    const [fetchingData, setFetchingData ] = React.useState(true);
    const [OpponentPokemon, setOpponentPokemon] = React.useState<Pokemon>();
    const [chosenMove, setchosenMove] = React.useState<PokemonMove>();

    // GET 1 random Opponent Pokemon at the beginning of the battle
    useEffect(() => {
        const fetchData = async () => {
            let promise = await addRandomPokemon()
            setOpponentPokemon(promise)
            setFetchingData(false);
        }

        fetchData();

    }, []);

    return (
        <div className={'battle-container page-col'}>
            {OpponentPokemon && !fetchingData ?
                <div className={'battle-item'}>
                    <PokemonBattleDesc chosenPokemon={OpponentPokemon} setchosenMove={undefined}></PokemonBattleDesc>
                    <div className='pokemon-display-item'>
                        <img className='pokemon-image pokemon-display-item' src={OpponentPokemon.image} alt={OpponentPokemon.name} width="150" height="150" />
                        <h4 className={'whiteColor'}>{NameToUpper(OpponentPokemon.name)}</h4>
                    </div>
                </div>
                : 'Loading...'
            }

            <MakeBattle chosenMove={chosenMove} chosenPokemon={chosenPokemon} OpponentPokemon={OpponentPokemon} setchosenMove={setchosenMove}></MakeBattle>


            {chosenPokemon ?
                <div className={'battle-item'}>
                    <div className='pokemon-display-item'>
                        <img className='pokemon-image pokemon-display-item' src={chosenPokemon.image} alt={chosenPokemon.name} width="150" height="150" />
                        <h4 className={'whiteColor'}>{NameToUpper(chosenPokemon.name)}</h4>
                    </div>
                    <PokemonBattleDesc chosenPokemon={chosenPokemon} setchosenMove={setchosenMove}></PokemonBattleDesc>
                </div>
                : 'Loading...'
            }
        </div>
    )
}