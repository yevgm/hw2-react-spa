import React from 'react';
import '../../App.css';
import { Pokemon } from '../../types';
import { YourPokemons } from './YourPokemons/YourPokemons';
import { Battle } from './Battle/battle';


export interface PageLayoutProps {
    page: number;
    changePage(page:number): void;
    characters: Pokemon[];
    setCharacters: React.Dispatch<React.SetStateAction<Pokemon[]>>;
    setBattlePokemon(chosenPokemon: Pokemon): void;
    BattlePokemon: Pokemon|undefined,
    gameLoaded: boolean,
}

export const PageLayout: React.FC<PageLayoutProps> = ({
      page,
      changePage,
      characters,
      setCharacters,
      setBattlePokemon,
      BattlePokemon,
      gameLoaded
}) => {

    switch(page) {
        case 0:
            return <YourPokemons
                                characters={characters}
                                setBattlePokemon={setBattlePokemon}
                                gameLoaded={gameLoaded}
                    />
        case 1:
            return <Battle
                            BattlePokemon={BattlePokemon}
                            changePage={changePage}
                            characters={characters}
                            setCharacters={setCharacters}
                            setBattlePokemon={setBattlePokemon}
                    />
        default:
            return null;

    }
}