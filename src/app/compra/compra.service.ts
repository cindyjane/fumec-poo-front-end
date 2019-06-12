import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { CompraRequest } from './shared/compra-request.model';
import { Compra } from './shared/compra.model';

@Injectable()
export class CompraService {
    private baseUrl: string;

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.endpoint;
    }

    public cadastrar(compraRequest: CompraRequest): Observable<void> {
        return this.httpClient.post<void>(this.baseUrl + '/compra', compraRequest);
    }

    public listar(nome: string, dataInicio: string, dataTermino: string): Observable<Compra[]> {
        const path = `/compra?query=${nome ? nome : ''}&de=${dataInicio}&para=${dataTermino}`;
        return this.httpClient.get<Compra[]>(this.baseUrl + path);
    }

    public excluir(numCompra: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/compra/${numCompra}`);
    }
}
