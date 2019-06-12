import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendaRequest } from '../shared/venda-request.model';
import { VendaService } from '../venda.service';
import { Router } from '@angular/router';
import { FormaPagamento } from '../shared/forma-pagamento.enum';
import { ItemVenda } from '../shared/item-venda.model';

@Component({
  selector: 'siscom-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {
  public form: FormGroup;
  public formaPagamentos: FormaPagamento[];

  constructor(private formBuilder: FormBuilder, private vendaService: VendaService, private router: Router) {
    this.formaPagamentos = Object.values(FormaPagamento).filter((value: any) => !Number.isInteger(value)) as FormaPagamento[];
  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.form = this.formBuilder.group({
      codigoCliente: [null, [Validators.required]],
      codigoVendedor: [null, [Validators.required]],
      formaPagamento: [null, [Validators.required]],
      codigoProdutos: [null, Validators.required],
      quantidadeVendas: [null, Validators.required],
      valorVendas: [null, Validators.required]
    });
  }

  public onSalvar() {
    const vendaRequest: VendaRequest = {
      codigoCliente: Number.parseInt(this.form.get('codigoCliente').value, 10),
      codigoVendedor: Number.parseInt(this.form.get('codigoVendedor').value, 10),
      formaPagamento: Number.parseInt(FormaPagamento[this.form.get('formaPagamento').value], 10),
      itensVenda: []
    }

    const codigoProdutos: string[] = this.form.get('codigoProdutos').value.split(',');
    const quantidadeVendas: string[] = this.form.get('quantidadeVendas').value.split(',');
    const valorVendas: string[] = this.form.get('valorVendas').value.split(',');

    codigoProdutos.forEach((codigoProduto: string, index: number) => {
      if (quantidadeVendas[index] && valorVendas[index]) {
        const itemVenda: ItemVenda = {
          codProduto: Number.parseInt(codigoProduto, 10),
          qntVenda: Number.parseInt(quantidadeVendas[index], 10),
          valorVenda: Number.parseFloat(valorVendas[index])
        }

        vendaRequest.itensVenda.push(itemVenda);
      }
    });

    console.log(vendaRequest);

    this.vendaService.cadastrar(vendaRequest).subscribe(() => {
      alert('Venda realizada com sucesso');
      this.router.navigateByUrl('venda/listar');
    }, () => alert('Erro ao realizar venda'));
  }
}
