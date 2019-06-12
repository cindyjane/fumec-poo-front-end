import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Estatistica } from './shared/estatistica.model';
import { TipoPessoa } from '../pessoa/shared/tipo-pessoa.enum';

@Injectable()
export class EstatisticaService {
    private baseUrl: string;

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.endpoint;
    }

    public listar(tipoPessoa: TipoPessoa, dataInicio: string, dataTermino: string): Observable<Estatistica[]> {
        let path;

        if (tipoPessoa === TipoPessoa.Fornecedor) {
            path = `/compra/statistics?de=${dataInicio}&para=${dataTermino}`;
        } else {
            path = `/venda/statistics?tipoPessoa=${tipoPessoa.toUpperCase()}&de=${dataInicio}&para=${dataTermino}`;
        }

        return this.httpClient.get<Estatistica[]>(this.baseUrl + path);
    }
}
