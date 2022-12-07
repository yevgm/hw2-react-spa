// Draw random Pokemon from API
import {Pokemon} from "../../../types";
import {ShuffleArray} from "../../../utils";

export const addRandomPokemon = async() => {
    const randomNumber = Math.ceil(Math.random() * 151);
    let newCharacterFromApi;

    // GET 1 random Pokemon
    try {
        newCharacterFromApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`);
        newCharacterFromApi = await newCharacterFromApi.json();
    } catch (e) {
        console.error(e);
    }

    // Create half-filled Pokemon object
    let newCharacter: Pokemon = {
        name: newCharacterFromApi.name,
        type: '',
        height: newCharacterFromApi.height,
        weight: newCharacterFromApi.weight,
        hp: '',
        attack: '',
        defense: '',
        special_attack: '',
        special_defense: '',
        speed: '',
        moves: [],
        image: newCharacterFromApi.sprites.front_default,
    }

    // Iterate through types and take only the first
    for (let type of newCharacterFromApi.types) {
        newCharacter.type = type.type.name;
        break  // take only the first type
    }

    // Iterate through stats and fill needed values
    for (let stat of newCharacterFromApi.stats) {
        if (stat.stat.name === 'hp'){
            newCharacter.hp = stat.base_stat
        }
        else if (stat.stat.name === 'attack'){
            newCharacter.attack = stat.base_stat
        }
        else if (stat.stat.name === 'defense'){
            newCharacter.defense = stat.base_stat
        }
        else if (stat.stat.name === 'special-attack'){
            newCharacter.special_attack = stat.base_stat
        }
        else if (stat.stat.name === 'special-defense'){
            newCharacter.special_defense = stat.base_stat
        }
        else if (stat.stat.name === 'speed'){
            newCharacter.speed = stat.base_stat
        }

    }

    // Iterate through all Pokemon moves, choose 4 randomly or all if there are less than 4 moves
    let moves_length: number = newCharacterFromApi.moves.length;
    let random_index_array = ShuffleArray(Array.from(Array(moves_length).keys()))
    for (let i of random_index_array.slice(0, 4)) {
        let move = newCharacterFromApi.moves[i];
        let newMoveFromApi;
        let move_name = move.move.name;

        try {
            newMoveFromApi = await fetch(`https://pokeapi.co/api/v2/move/${move_name}`);
            newMoveFromApi = await newMoveFromApi.json();
        } catch (e) {
            console.error(e);
        }
        let power = newMoveFromApi.power
        newCharacter.moves.unshift({name: move_name, power:power})
    }


    return newCharacter
}