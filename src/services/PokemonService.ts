import {PokemonI} from "../interfaces/PokemonInterfaces";
import { MonsterTypeI } from "../interfaces/MonsterTypeI";
const db = require('../db/Pokemons.json');
// var db = require('../db/Pokemons.json');  ACTIVAR JUNTO CON LA LINEA 64 PARA GUARDAR EN LA BASE DE DATOS

module PokemonService{
    export function getAll(): Array<PokemonI>{
        const pokemons: Array<PokemonI> = db;
        return pokemons
    }

    export function get(id: number): PokemonI {
        const pokemons: Array<PokemonI> = db;
        const pokemon: Array<PokemonI> = pokemons.filter(e => e.id === id);
        if (pokemon.length < 1) {
            throw "No se encontró el digimon"
        }
        return pokemon[0];
    }

    export function getByName(name: string): Array<PokemonI> {
        const pokemons: Array<PokemonI> = db;
        const matches: Array<PokemonI> = pokemons.filter(function(el){
            return el.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
        })
        if(matches.length<1){
            throw "No se encontró el pokemon"
        }
        return matches;
    }

    export function getByType(type: string): Array<PokemonI> {
        const pokemons: Array<PokemonI> = db;
        let matches: Array<PokemonI> = [];
        pokemons.forEach(pokemon => {
            const found = pokemon.type.filter(e => e.name === type);
            if (found.length>0) {
                matches.push(pokemon);
            }
        })
         
        if (matches.length < 1) {
            throw "No se encontró el tipo de pokemon"
        }
        return matches;
    }

    export function getContrary(pokemon: string): PokemonI{
        const pokemons: Array<PokemonI> = db;
        let match: Array<PokemonI> = pokemons.filter(d => d.name === pokemon);
        // let contrary: MonsterTypeI = match[0].type[0].strongAgainst[0];
        if(match.length < 1){
            throw "No existe el pokemon";
        }
        return match[0];
    }

    export function postPokemon(name: string, type: MonsterTypeI[]): PokemonI{
        const pokemons: Array<PokemonI> = db;
        const poke:PokemonI= {id:7, name: name, type: type, img: ""};
        pokemons.push(poke);
        // db = pokemons;
        return pokemons[pokemons.length - 1];
    }
}

export default PokemonService;

