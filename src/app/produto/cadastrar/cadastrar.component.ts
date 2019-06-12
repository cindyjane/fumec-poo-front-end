import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProdutoService } from '../produto.service';
import { Router } from '@angular/router';
import { ProdutoRequest } from '../shared/produto-request.model';

@Component({
  selector: 'siscom-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService, private router: Router) { }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required]],
      precoUnitario: [null, [Validators.required]],
      estoque: [null, [Validators.required]],
      estoqueMinimo: [null, [Validators.required]]
    });

  }
  public onSalvar() {
    const produtoRequest: ProdutoRequest = {
      nome: this.form.get('nome').value,
      precoUnitario: this.form.get('precoUnitario').value,
      estoque: this.form.get('estoque').value,
      estoqueMinimo: this.form.get('estoqueMinimo').value,
    } as ProdutoRequest;

    this.produtoService.cadastrar(produtoRequest).subscribe(() => {
      alert('Cadastrado com sucesso');
      this.router.navigateByUrl('produto/listar');
    });

  }

}
