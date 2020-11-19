import { MonsterTypeI } from "./MonsterTypeI";

export interface DigimonI {
    id: number
    name: string
    type: Array<MonsterTypeI>
    img: string
}
