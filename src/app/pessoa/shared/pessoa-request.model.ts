import { TipoPessoa } from "./tipo-pessoa.enum";

export interface PessoaRequest {
    cliCpf: string;
    cliLimiteCredito: number;
    dateCad: string;
    email: string;
    forCnpj: string;
    forNomeContato: string;
    nome: string;
    telefones: string;
    tipoPessoa: TipoPessoa;
    venCpf: string;
    venMetaMensal: number;
}