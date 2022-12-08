import React from 'react';
import {Pokemon} from "../types";

export interface HeaderProps {
    page: number,
    characters: Pokemon[],
    handleRefreshGame(): void,
}
export const Header: React.FC<HeaderProps> = ({
    page,
    characters,
    handleRefreshGame,
}) => {

    const SwitchHeader = () => {
        switch(page) {
            case 0:
                return (
                    <div className='App-header'>
                        <h1> Your Pokemons ({characters.length})</h1>
                    </div>
                );
            case 1:
                return (
                    <div className='App-header'>
                        <h1>Battle</h1>
                    </div>
                );
            default:
                return null
        }
    }

    return (
        <div className='header-container'>
            {SwitchHeader()}
            <div className='nav-tab'>
                {page === 0?
                <button key={'refresh-key'} className='refresh-button' onClick={handleRefreshGame}>Restart</button>:
                    <></>
                }
            </div>
        </div>
    );
}