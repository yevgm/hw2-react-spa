export interface Pokemon {
    name: string;
    type: string;
    height: string;
    weight: string;
    hp: string;
    attack: string;
    defense: string;
    special_attack: string;
    special_defense: string;
    speed: string;
    moves: PokemonMove[];
    image?: string;
}

export interface PokemonMove{
    name: string;
    power: number;
}