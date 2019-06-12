import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TipoPessoa } from '../shared/tipo-pessoa.enum';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../shared/pessoa.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'siscom-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  public dataSource: any;
  public displayedColumns: any;
  public baseColumns: any;
  public tipoPessoa: FormControl;
  public nome: FormControl;
  public cpfCnpj: FormControl;
  public tipoPessoas: TipoPessoa[];
  public tipoPessoaTypes: typeof TipoPessoa;

  constructor(private pessoaService: PessoaService, private router: Router) {
    this.tipoPessoas = Object.values(TipoPessoa);
    this.tipoPessoaTypes = TipoPessoa;
  }

  ngOnInit() {
    this.dataSource = [];
    this.displayedColumns = ['nome', 'telefones', 'email', 'dateCad', 'acoes'];
    this.baseColumns = ['nome', 'telefones', 'email', 'dateCad', 'acoes'];

    this.tipoPessoa = new FormControl(null, [Validators.required]);
    this.nome = new FormControl(null, [Validators.required]);
    this.cpfCnpj = new FormControl(null, [Validators.required]);
    this.nome.disable();
    this.tipoPessoa.valueChanges.subscribe(this.onTipoPessoaChange);
    this.cpfCnpj.valueChanges.pipe(debounceTime(1000)).subscribe(this.onCpfCnpjChange);
    this.nome.valueChanges.subscribe(this.onNomeChange);
  }

  public onTipoPessoaChange = (tipoPessoa: TipoPessoa) => {

    this.displayedColumns = [...this.baseColumns.slice(0, this.baseColumns.length - 1)];

    if (tipoPessoa === TipoPessoa.Cliente) {
      this.displayedColumns.push('limiteCredito', 'cpf', 'acoes');
    } else if (tipoPessoa === TipoPessoa.Fornecedor) {
      this.displayedColumns.push('nomeContato', 'cnpj', 'acoes');
    } else if (tipoPessoa === TipoPessoa.Vendedor) {
      this.displayedColumns.push('metaMensal', 'cpf', 'acoes');
    }


    this.listarPessoas();

    this.nome.enable();
  }

  public onNomeChange = () => {
    this.listarPessoas();
  }

  public onCpfCnpjChange = (cpfCnpj: string) => {
    this.tipoPessoa.reset(null, { emitEvent: false });
    this.buscarPessoa(cpfCnpj);
  }

  public apagar = (pessoa: Pessoa) => {
    this.pessoaService.excluir(pessoa.codigo).subscribe(() => {
      alert(`${pessoa.nome} excluída com sucesso!`);
      if (this.cpfCnpj.value) {
        this.dataSource = [];
        this.cpfCnpj.reset(null, { emitEvent: false });
      } else {
        this.listarPessoas();
      }

    }, (err: HttpErrorResponse) => {
      console.log(err);
      alert(err.error.message);
    });
  }

  public listarPessoas = () => {
    this.pessoaService.listar(this.nome.value, this.tipoPessoa.value).subscribe((results: Pessoa[]) => {
      this.dataSource = results;
    });
  }

  public buscarPessoa = (cpfCnpj: string) => {
    this.pessoaService.buscar(cpfCnpj).subscribe((pessoa: Pessoa) => {
      this.dataSource = [pessoa];
    }, () => {
      this.dataSource = [];
    });
  }

  public onAddClick() {
    this.router.navigateByUrl('pessoa/cadastrar');
  }
}
