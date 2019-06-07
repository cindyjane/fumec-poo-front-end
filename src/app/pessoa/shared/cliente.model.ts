import { Pessoa } from "./pessoa.model";

export interface Cliente extends Pessoa {
    cpf: string;
    limiteCredito: number;
}