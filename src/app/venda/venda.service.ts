import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { VendaRequest } from './shared/venda-request.model';
import { Venda } from './shared/venda.model';
import { TipoPessoa } from '../pessoa/shared/tipo-pessoa.enum';

@Injectable()
export class VendaService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.endpoint;
  }

  public cadastrar(vendaRequest: VendaRequest): Observable<void> {
    return this.httpClient.post<void>(this.baseUrl + '/venda', vendaRequest);
  }

  public listar(nome: string, tipoPessoa: TipoPessoa, dataInicio: string, dataTermino: string): Observable<Venda[]> {
    return this.httpClient.get<Venda[]>(this.baseUrl + `/venda?query=${nome ? nome : ''}
                &tipoPessoa=${tipoPessoa.toUpperCase()}&de=${dataInicio}&para=${dataTermino}`);
  }

  public excluir(numVenda: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/venda/${numVenda}`);
  }
}
