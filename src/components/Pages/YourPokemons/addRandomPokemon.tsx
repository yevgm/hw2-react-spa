import {Pokemon, PokemonMove} from "../../../types";
import {ShuffleArray} from "../../../utils";
import {PokemonCard} from "./PokemonCard";

// Draw random Pokemon from API
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

    // Create default Pokemon object
    let newCharacter: Pokemon = {
        name: newCharacterFromApi?.name ? newCharacterFromApi.name: 'pokemon',
        type: '',
        height: newCharacterFromApi?.height <= 0 ? 1: newCharacterFromApi.height,
        weight: newCharacterFromApi?.weight <= 0 ? 1: newCharacterFromApi.weight,
        hp: '',
        attack: '',
        defense: '',
        special_attack: '',
        special_defense: '',
        speed: '',
        moves: [],
        pokemon_moves: [],
        image: newCharacterFromApi.sprites.front_default,
    }

    // Iterate through types and take only the first
    for (let type of newCharacterFromApi.types) {
        newCharacter.type = type.type.name;
        break  // take only the first type
    }

    // Iterate through stats and fill needed values
    for (let stat of newCharacterFromApi.stats) {
        if (stat) {
            if (stat.stat.name === 'hp') {
                newCharacter.hp = stat?.base_stat
            } else if (stat.stat.name === 'attack') {
                newCharacter.attack = stat?.base_stat
            } else if (stat.stat.name === 'defense') {
                newCharacter.defense = stat?.base_stat
            } else if (stat.stat.name === 'special-attack') {
                newCharacter.special_attack = stat?.base_stat
            } else if (stat.stat.name === 'special-defense') {
                newCharacter.special_defense = stat?.base_stat
            } else if (stat.stat.name === 'speed') {
                newCharacter.speed = stat?.base_stat
            }
        }

    }

    // Save all the avaliable moves. Choose 4 random and unique moves every new battle!
    newCharacter.moves = newCharacterFromApi.moves;

    return newCharacter
}
export const ValidateMoveUniqueness = (moveArray:PokemonMove[], currentMove:string) =>{
    for (let pokemonMove of moveArray){
        if (pokemonMove.name === currentMove){
            return false;
        }
    }

    return true;
}

export const DrawRandomUniqueMoves = async(pokemon: Pokemon) => {
    pokemon.pokemon_moves = [];
    // Iterate through all Pokemon moves, choose 4 randomly or all if there are less than 4 moves
    let moves_length: number = pokemon.moves.length;
    if (moves_length) {
        // Draw 4 random moves for each Pokemon
        let random_index_array = ShuffleArray(Array.from(Array(moves_length).keys()))
        for (let i of random_index_array) {
            let move = pokemon.moves[i];
            let newMoveFromApi;
            let move_name = move.move.name;
            // console.log(move)
            if (!ValidateMoveUniqueness(pokemon.pokemon_moves, move_name)){
                continue;
            }

            // if it's unique continue to draw until we have 4 moves or no other indices
            try {
                newMoveFromApi = await fetch(`https://pokeapi.co/api/v2/move/${move_name}`);
                newMoveFromApi = await newMoveFromApi.json();
            } catch (e) {
                console.error(e);
            }

            let power:number = newMoveFromApi.power === null ? 0 : newMoveFromApi.power
            pokemon.pokemon_moves.unshift({name: move_name, power: power})

            if (pokemon.pokemon_moves.length === 4){
                break;
            }
        }
    }
}