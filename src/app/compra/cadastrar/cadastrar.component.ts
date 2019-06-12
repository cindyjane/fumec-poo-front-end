import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompraService } from '../compra.service';
import { CompraRequest } from '../shared/compra-request.model';
import { ItemCompra } from '../shared/item-compra.model';

@Component({
  selector: 'siscom-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private compraService: CompraService, private router: Router) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.form = this.formBuilder.group({
      codigoFornecedor: [null, [Validators.required]],
      codigoProdutos: [null, Validators.required],
      quantidadeCompras: [null, Validators.required],
      valorCompras: [null, Validators.required]
    });
  }

  public onSalvar() {
    const compraRequest: CompraRequest = {
      codigoFornecedor: Number.parseInt(this.form.get('codigoFornecedor').value, 10),
      itensCompra: []
    }

    const codigoProdutos: string[] = this.form.get('codigoProdutos').value.split(',');
    const quantidadeCompras: string[] = this.form.get('quantidadeCompras').value.split(',');
    const valorCompras: string[] = this.form.get('valorCompras').value.split(',');

    codigoProdutos.forEach((codigoProduto: string, index: number) => {
      if (quantidadeCompras[index] && valorCompras[index]) {
        const itemCompra: ItemCompra = {
          codProduto: Number.parseInt(codigoProduto, 10),
          quantCompra: Number.parseInt(quantidadeCompras[index], 10),
          valorUnitario: Number.parseFloat(valorCompras[index])
        }

        compraRequest.itensCompra.push(itemCompra);
      }
    });

    console.log(compraRequest);

    this.compraService.cadastrar(compraRequest).subscribe(() => {
      alert('Compra realizada com sucesso');
      this.router.navigateByUrl('compra/listar');
    }, () => alert('Erro ao realizar compra'));
  }
}
