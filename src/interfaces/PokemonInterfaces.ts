import { MonsterTypeI } from "./MonsterTypeI";

export interface PokemonI {
    name: string
    id: number
    type: Array<MonsterTypeI>
    img: string
}
