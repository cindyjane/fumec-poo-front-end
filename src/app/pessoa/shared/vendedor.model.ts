import { Pessoa } from "./pessoa.model";

export interface Vendedor extends Pessoa {
    cnpj: string;
    metaMensal: number;
}