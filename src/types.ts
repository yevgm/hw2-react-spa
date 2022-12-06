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

// Type order conven
export class TypeTable {
    private typetable: number[][];
    private StringToIdx: {[key:string]: number};

    constructor() {
        this.typetable = [
            [1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,1/2,  0,  1], // normal
            [1,1/2,1/2,  1,  2,  2,  1,  1,  1,  1,  1,  2,1/2,  1,1/2], // fire
            [1,  2,1/2,  1,1/2,  1,  1,  1,  2,  1,  1,  1,  2,  1,1/2], // water
            [1,  1,  2,1/2,1/2,  1,  1,  1,  0,  2,  1,  1,  1,  1,1/2], // electric
            [1,1/2,  2,  1,1/2,  1,  1,1/2,  2,1/2,  1,  1,  1,  1,  1], // grass
            [1,  1,1/2,  1,  2,1/2,  1,  1,  2,  2,  1,  1,  1,  1,  2], // ice
            [2,  1,  1,  1,  1,  2,  1,1/2,  1,1/2,1/2,1/2,  2,  0,  1], // fighting
            [1,  1,  1,  1,  2,  1,  1,1/2,1/2,  1,  1,  2,1/2,1/2,  1], // poison
            [1,  2,  1,  2,1/2,  1,  1,  2,  1,  0,  1,1/2,  2,  1,  1], // ground
            [1,  1,  1,1/2,  2,  1,  2,  1,  1,  1,  1,  2,1/2,  1,  1], // flying
            [1,  1,  1,  1,  1,  1,  2,  2,  1,  1,1/2,  1,  1,  1,  1], // psychic
            [1,1/2,  1,  1,  2,  1,1/2,  2,  1,1/2,  2,  1,  1,1/2,  1], // bug
            [1,  2,  1,  1,  1,  2,1/2,  1,1/2,  2,  1,  2,  1,  1,  1], // rock
            [0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  2,  1], // ghost
            [1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2], // dragon
        ];

        this.StringToIdx = {
            'normal': 0,
            'fire': 1,
            'water': 2,
            'electric': 3,
            'grass': 4,
            'ice': 5,
            'fighting': 6,
            'poison': 7,
            'ground': 8,
            'flying': 9,
            'psychic': 10,
            'bug': 11,
            'rock': 12,
            'ghost': 13,
            'dragon': 14
        };
    }

    private ToIndex(type:string){
        return this.StringToIdx[type];
    }

    getType(attackType: string, defenceType: string){
        let attackTypeIdx: number = this.ToIndex(attackType);
        let defenceTypeIdx: number = this.ToIndex(defenceType);
        return this.typetable[attackTypeIdx][defenceTypeIdx];
    }
}

export let typeTable:TypeTable = new TypeTable();
