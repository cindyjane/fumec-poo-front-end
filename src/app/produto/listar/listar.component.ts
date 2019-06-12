import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Produto } from '../shared/produto.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'siscom-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  public dataSource: any;
  public displayedColumns: any;
  public nome: FormControl;
  public codigo: FormControl;
  public emFalta: FormControl;


  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService, private router: Router) { }

  ngOnInit() {
    this.dataSource = [];
    this.displayedColumns = ['nome', 'precoUnitario', 'estoque', 'estoqueMinimo', 'dateCad', 'acoes'];

    this.emFalta = new FormControl(null, [Validators.required]);
    this.codigo = new FormControl(null, [Validators.required]);
    this.nome = new FormControl(null, [Validators.required]);
    this.codigo.valueChanges.pipe(debounceTime(1000)).subscribe(this.onCodigoChange);
    this.nome.valueChanges.subscribe(this.onNomeChange);
    this.emFalta.valueChanges.subscribe(this.emFaltaChange);

  }




  public buscarProduto = (codigo: number) => {
    this.produtoService.buscar(codigo).subscribe((produto: Produto) => {
      this.dataSource = [produto];
    }, () => {
      this.dataSource = [];
    });
  }

  public onNomeChange = () => {
    this.listarProdutos();
  }

  public emFaltaChange = () => {
    console.log(this.emFalta);
    this.listarProdutos();
  }


  public onCodigoChange = (codigo: number) => {
    this.nome.reset(null, { emitEvent: false });
    this.emFalta.reset(null, { emitEvent: false });
    this.buscarProduto(codigo);
  }

  public apagar = (produto: Produto) => {
    this.produtoService.excluir(produto.codigo).subscribe(() => {
      alert(`${produto.nome} excluída com sucesso!`);
      if (this.codigo.value) {
        this.dataSource = [];
        this.codigo.reset(null, { emitEvent: false });
      } else {
        this.listarProdutos();
      }

    }, (err: HttpErrorResponse) => {
      console.log(err);
      alert(err.error.message);
    });
  }


  public listarProdutos = () => {
    this.produtoService.listar(this.nome.value, this.emFalta.value).subscribe((results: Produto[]) => {
      this.dataSource = results;
    });
  }



  public onAddClick() {
    this.router.navigateByUrl('produto/cadastrar');
  }

}
