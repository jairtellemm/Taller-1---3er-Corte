import { Request, Response } from "express";
import { MonsterTypeI } from "../interfaces/MonsterTypeI";
import DigimonsService from "../services/DigimonsService";

export function getAll(_: any, res: Response) {
    const digimons = DigimonsService.getAll();
    res.status(200).json(digimons);
}

export function get(req: Request, res: Response) {
    try {
        const id = req.params.id && +req.params.id || undefined;
        if(!id){ throw "Se requiere el ID del digimon."}
        const digimon = DigimonsService.get(id);
        res.status(200).json(digimon);
    } catch (error) {
        res.status(400).send(error);
    }
}

export function getByName(req: Request, res: Response) {
    try {
        const name = req.params.name && req.params.name || undefined;
        if(!name){ throw "Se requiere el name del digimon."}
        const digimons = DigimonsService.getByName(name);
        res.status(200).json(digimons);
    } catch (error) {
        res.status(400).send(error);
    }
}

export function getByType(req: Request, res: Response) {
    try {
        const type = req.params.type && req.params.type || undefined;
        if(!type){ throw "Se requiere el Tipo del digimon."}
        const digimons = DigimonsService.getByType(type);
        res.status(200).json(digimons);
    } catch (error) {
        res.status(400).send(error);
    }
}

export function getStrongAndWeak(req: Request, res: Response){
    try {
        const name = req.params.name;
        if(!name){
            throw "Se requiere el nombre y el rival del digimon.";
        }
        
        const contraryResult = DigimonsService.getContrary(name);
        
        res.status(200).json({name: contraryResult.name, strongAgainst: "es fuerte contra: "+contraryResult.type[0].strongAgainst[0], weakAgainst: "es debil contra: "+contraryResult.type[0].weakAgainst[0]});
    } catch (error) {
        res.status(400).send(error);
    }
}

export function addDigimon(req: Request, res: Response){
    try {
        const name = req.params.name;
        const strongAgainst : MonsterTypeI =  {name: req.params.strongAgainst, strongAgainst: [], weakAgainst: []};
        const weakAgainst : MonsterTypeI =  {name: req.params.weakAgainst, strongAgainst: [], weakAgainst: []};
        const type : MonsterTypeI[] = [{name: req.params.type, strongAgainst: [strongAgainst], weakAgainst: [weakAgainst]}];

        if(!name){
            throw "Se requiere el nombre del digimon.";
        }

        if(!type){
            throw "Se requiere el tipo del digimon.";
        }

        if(!strongAgainst){
            throw "Se requiere el rival del digimon.";
        }

        if(!weakAgainst){
            throw "Se requiere el rival del digimon.";
        }

        const newDigimon = DigimonsService.postDigimon(name,type);
        res.status(200).send("Se ha agregado el digimon: "+ newDigimon.name);

    } catch (error) {
        res.status(400).send(error);
    }
}