import { Injectable } from '@angular/core';
import { ProdutoRequest } from './shared/produto-request.model';
import { Observable } from 'rxjs';
import { Produto } from './shared/produto.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProdutoService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.endpoint;
  }

  public cadastrar(produtoRequest: ProdutoRequest): Observable<void> {
    return this.httpClient.post<void>(this.baseUrl + '/produto', produtoRequest);
  }

  public buscar(codigo: number): Observable<Produto> {
    return this.httpClient.get<Produto>(`${this.baseUrl}/produto/${codigo}`);
  }

  public listar(nome: string, emFalta: boolean): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(this.baseUrl + '/produto');
  }

  public excluir(codigo: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/produto/${codigo}`);
  }
}
