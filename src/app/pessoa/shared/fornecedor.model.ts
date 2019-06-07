import { Pessoa } from "./pessoa.model";

export interface Fornecedor extends Pessoa {
    cnpj: string;
    nomeContato: string;
}