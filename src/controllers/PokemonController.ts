import { Request, Response } from "express";
import { MonsterTypeI } from "../interfaces/MonsterTypeI";
import PokemonService from "../services/PokemonService";

export function getAll(_: any, res: Response) {
    const pokemons = PokemonService.getAll();
    res.status(200).json(pokemons);
}

export function get(req: Request, res: Response) {
    try {
        const id = req.params.id && +req.params.id || undefined;
        if(!id){ throw "Se requiere el ID del pokemon."}
        const pokemon = PokemonService.get(id);
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).send(error);
    }
}

export function getByName(req: Request, res: Response) {
    try {
        const name = req.params.name && req.params.name || undefined;
        if(!name){ throw "Se requiere el name del pokemon."}
        const pokemons = PokemonService.getByName(name);
        res.status(200).json(pokemons);
    } catch (error) {
        res.status(400).send(error);
    }
}

export function getByType(req: Request, res: Response) {
    try {
        const type = req.params.type && req.params.type || undefined;
        if(!type){ throw "Se requiere el Tipo del pokemon."}
        const pokemons = PokemonService.getByType(type);
        res.status(200).json(pokemons);
    } catch (error) {
        res.status(400).send(error);
    }
}

export function getStrongAndWeak(req: Request, res: Response){
    try {
        const name = req.params.name;
        if(!name){
            throw "Se requiere el nombre y el rival del pokemon.";
        }
        
        const contraryResult = PokemonService.getContrary(name);
        const entregaJSON = {name: contraryResult.name, strongAgainst: [contraryResult.type[0].strongAgainst[0]], weakAgainst:[contraryResult.type[0].weakAgainst[0]]};

        for (let i = 1; i < contraryResult.type[0].strongAgainst.length; i++) {
            entregaJSON.strongAgainst[i] = contraryResult.type[0].strongAgainst[i];
        }

        for (let i = 1; i < contraryResult.type[0].weakAgainst.length; i++) {
            entregaJSON.weakAgainst[i] = contraryResult.type[0].weakAgainst[i];
        }

        res.status(200).json({entregaJSON});
    } catch (error) {
        res.status(400).send(error);
    }
}


export function addPokemon(req: Request, res: Response){
    try {
        const name = req.params.name;
        const strongAgainst : MonsterTypeI =  {name: req.params.strongAgainst, strongAgainst: [], weakAgainst: []};
        const weakAgainst : MonsterTypeI =  {name: req.params.weakAgainst, strongAgainst: [], weakAgainst: []};
        const type : MonsterTypeI[] = [{name: req.params.type, strongAgainst: [strongAgainst], weakAgainst: [weakAgainst]}];

        if(!name){
            throw "Se requiere el nombre del pokemon.";
        }

        if(!type){
            throw "Se requiere el tipo del pokemon.";
        }

        if(!strongAgainst){
            throw "Se requiere el rival del pokemon.";
        }

        if(!weakAgainst){
            throw "Se requiere el rival del pokemon.";
        }

        const newDigimon = PokemonService.postPokemon(name,type);
        res.status(200).send("Se ha agregado el pokemon: "+ newDigimon.name);

    } catch (error) {
        res.status(400).send(error);
    }
}



