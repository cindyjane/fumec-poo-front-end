import { FormaPagamento } from './forma-pagamento.enum';
import { ItemVenda } from './item-venda.model';

export interface VendaRequest {
  codigoCliente: number;
  codigoVendedor: number;
  formaPagamento: number;
  itensVenda: ItemVenda[];
}
