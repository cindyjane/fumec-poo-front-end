import { ItemCompra } from './item-compra.model';

export interface CompraRequest {

    codigoFornecedor: number;
    itensCompra: ItemCompra[];
}
