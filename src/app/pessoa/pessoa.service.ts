import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PessoaRequest } from './shared/pessoa-request.model';
import { TipoPessoa } from './shared/tipo-pessoa.enum';
import { Pessoa } from './shared/pessoa.model';

@Injectable()
export class PessoaService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.endpoint;
  }

  public cadastrar(pessoaRequest: PessoaRequest): Observable<void> {
    return this.httpClient.post<void>(this.baseUrl + '/pessoa', pessoaRequest);
  }

  public buscar(cpfCnpj: string, tipoPessoa: TipoPessoa): Observable<Pessoa> {
    return this.httpClient.get<Pessoa>(`${this.baseUrl}/pessoa/${tipoPessoa}/${cpfCnpj}`);
  }

  public listar(): Observable<Pessoa[]> {
    return this.httpClient.get<Pessoa[]>(this.baseUrl + '/pessoa');
  }

  public excluir(codigo: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/pessoa/${codigo}`);
  }
}
