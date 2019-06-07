import { TipoPessoa } from "./tipo-pessoa.enum";

export interface Pessoa {
    codigo: number;
    dateCad: Date;
    email: string;
    nome: string;
    telefones: string;
    tipoPessoa: TipoPessoa;
}