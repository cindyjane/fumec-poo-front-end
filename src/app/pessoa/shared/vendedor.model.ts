import { Pessoa } from "./pessoa.model";

export interface Vendedor extends Pessoa {
    cpf: string;
    metaMensal: number;
}