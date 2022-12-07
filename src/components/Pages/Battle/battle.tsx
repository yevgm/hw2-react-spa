import React, {useEffect} from 'react';
import '../../../App.css';
import {Pokemon, PokemonMove} from "../../../types";
import {addRandomPokemon} from "../YourPokemons/addRandomPokemon";
import {PokemonBattleDesc} from "./PokemonBattleDesc";
import {MakeBattle} from "./MakeBattle";
import {NameToUpper} from "../../../utils";

export interface BattleProps {
    BattlePokemon: Pokemon|undefined,
    changePage(page:number): void,
    characters: Pokemon[];
    setCharacters: React.Dispatch<React.SetStateAction<Pokemon[]>>;
    setBattlePokemon(chosenPokemon: Pokemon|undefined): void;
}


export const Battle: React.FC<BattleProps> = ({
      BattlePokemon,
      changePage,
      characters,
      setCharacters,
      setBattlePokemon
}) => {

    const [fetchingData, setFetchingData ] = React.useState(true);
    const [OpponentPokemon, setOpponentPokemon] = React.useState<Pokemon>();
    const [chosenMove, setchosenMove] = React.useState<PokemonMove>();

    function endBattle(result: string, objectivePokemon: Pokemon){
        if (result === 'player'){
            // player won the Pokemon
            const newCharactersList = [...characters, objectivePokemon];
            setCharacters(newCharactersList);
            setchosenMove(undefined);
            setBattlePokemon(undefined);
            setOpponentPokemon(undefined)
        }
        else if (result === 'bot'){
            // Bot won the Pokemon
            const newCharactersList = characters.filter((pokemon) => pokemon !== objectivePokemon);
            setCharacters(newCharactersList);
            setchosenMove(undefined);
            setBattlePokemon(undefined);
            setOpponentPokemon(undefined)
        }

        changePage(0)
    }

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
        <div className={'battle-container page-col whiteColor'}>
            {OpponentPokemon && !fetchingData ?
                <div className={'battle-item'}>
                    <div className={'whiteColor player-name'}>
                        <h1 className={'top-margin'}>PC's Pokemon:</h1>
                    </div>
                    <PokemonBattleDesc chosenPokemon={OpponentPokemon} setchosenMove={undefined} fetchingData={fetchingData}></PokemonBattleDesc>
                    <div className='pokemon-display-item-name'>
                        {OpponentPokemon.image? <img className='pokemon-display-item box-margin margin' src={OpponentPokemon.image} alt={OpponentPokemon.name} width="150" height="150" />: null}
                        <h3 className={'whiteColor margin'}>{NameToUpper(OpponentPokemon.name)}</h3>
                    </div>
                </div>
                : 'Loading...'
            }
            <MakeBattle
                chosenMove={chosenMove}
                chosenPokemon={BattlePokemon}
                OpponentPokemon={OpponentPokemon}
                setchosenMove={setchosenMove}
                endBattle={endBattle}
            />
            {BattlePokemon ?
                <div className={'battle-item'}>
                    <div className={'whiteColor player-name'}>
                        <h1 className={'top-margin'}>Your Pokemon:</h1>
                    </div>
                    <div className='pokemon-display-item-name'>
                        <h3 className={'whiteColor margin'}>{NameToUpper(BattlePokemon.name)}</h3>
                        {BattlePokemon.image? <img className='pokemon-display-item margin' src={BattlePokemon.image} alt={BattlePokemon.name} width="150" height="150" />: null}
                    </div>
                    <PokemonBattleDesc chosenPokemon={BattlePokemon} setchosenMove={setchosenMove} fetchingData={fetchingData}></PokemonBattleDesc>
                </div>
                : 'Loading...'
            }
        </div>
    )
}