import React from 'react';
import {Pokemon} from "../types";

export interface HeaderProps {
    page: number,
    characters: Pokemon[],
}
export const Header: React.FC<HeaderProps> = ({
    page,
    characters
}) => {

    const SwitchHeader = () => {
        switch(page) {
            case 0:
                return <h1 className='App-header'> Your Pokemons ({characters.length})</h1>
            case 1:
                return <h1 className='App-header'> Battle</h1>
            default:
                return null
        }
    }

    return (
        <div className='header-container'>
            {SwitchHeader()}
        </div>
    );
}