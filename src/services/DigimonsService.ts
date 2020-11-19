import { DigimonI } from "../interfaces/DigimonInterfaces";
import { MonsterTypeI } from "../interfaces/MonsterTypeI";
const db = require('../db/Digimons.json');
// var db = require('../db/Digimons.json');  ACTIVAR JUNTO CON LA LINEA 64 PARA GUARDAR EN LA BASE DE DATOS

module DigimonsService { 
    export function getAll(): Array<DigimonI> {
        const digimons: Array<DigimonI> = db;
        return digimons
    }

// ----------------------------------------------------------------------------------------------   
    export function get(id: number): DigimonI {
        const digimons: Array<DigimonI> = db;
        const digimon: Array<DigimonI> = digimons.filter(e => e.id === id);
        if (digimon.length < 1) {
            throw "No se encontró el digimon"
        }
        return digimon[0];
    }

// ----------------------------------------------------------------------------------------------   
    export function getByName(name: string): Array<DigimonI> {
        const digimons: Array<DigimonI> = db;
        const matches: Array<DigimonI> = digimons.filter(function(el) {
            return el.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
        })
        if (matches.length < 1) {
            throw "No se encontró el digimon"
        }
        return matches;
    }

// ----------------------------------------------------------------------------------------------   
    export function getByType(type: string): Array<DigimonI> {
        const digimons: Array<DigimonI> = db;
        let matches: Array<DigimonI> = [];
        digimons.forEach(digimon => {
            const found = digimon.type.filter(e => e.name === type);
            if (found.length>0) {
                matches.push(digimon);
            }
        })
         
        if (matches.length < 1) {
            throw "No se encontró el tipo"
        }
        return matches;
    }

// ---------------------------------------------------------------------------------------------- 
    export function getContrary(digimon: string): DigimonI{
        const digimons: Array<DigimonI> = db;
        let match: Array<DigimonI> = digimons.filter(d => d.name === digimon);
        // let contrary: MonsterTypeI = match[0].type[0].strongAgainst[0];
        if(match.length < 1){
            throw "No existe el digimon";
        }
        return match[0];
    }

// ----------------------------------------------------------------------------------------------   
    export function postDigimon(name: string, type: MonsterTypeI[]): DigimonI{
        const digimons: Array<DigimonI> = db;
        const digi:DigimonI= {id:7, name: name, type: type, img: ""};
        digimons.push(digi);
        // db = digimons;
        return digimons[digimons.length - 1];
    }
}

export default DigimonsService;
