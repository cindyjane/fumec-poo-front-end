import { Component, OnInit } from '@angular/core';
import { TipoPessoa } from '../shared/tipo-pessoa.enum';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Pessoa } from '../shared/pessoa.model';
import { PessoaRequest } from '../shared/pessoa-request.model';
import { PessoaService } from '../pessoa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'siscom-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {
  public form: FormGroup;
  public tipoPessoas: TipoPessoa[];
  public tipoPessoa: TipoPessoa;

  constructor(private formBuilder: FormBuilder, private pessoaService: PessoaService, private router: Router) {
    this.tipoPessoas = Object.values(TipoPessoa);
  }

  ngOnInit() {
    this.initializeForm();
  }


  public onTipoPessoaChanged = (tipoPessoa: TipoPessoa) => {
    this.form.removeControl('cpf');
    this.form.removeControl('cnpj');
    this.form.removeControl('limiteCredito');
    this.form.removeControl('nomeContato');
    this.form.removeControl('metaMensal');

    if (tipoPessoa === TipoPessoa.Cliente) {
      this.form.addControl('cpf', new FormControl(null, [Validators.required]));
      this.form.addControl('limiteCredito', new FormControl(null, [Validators.required]));
    } else if (tipoPessoa === TipoPessoa.Fornecedor) {
      this.form.addControl('cnpj', new FormControl(null, [Validators.required]));
      this.form.addControl('nomeContato', new FormControl(null, [Validators.required]));
    } else {
      this.form.addControl('cpf', new FormControl(null, [Validators.required]));
      this.form.addControl('metaMensal', new FormControl(null, [Validators.required]));
    }

    this.tipoPessoa = tipoPessoa;
  }

  private initializeForm() {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required]],
      telefones: [null, [Validators.required]],
      email: [null, [Validators.required]],
      tipoPessoa: [null, [Validators.required]]
    });

    this.form.get('tipoPessoa').valueChanges.subscribe(this.onTipoPessoaChanged);
  }

  public onSalvar() {
    let tipoPessoa: number;

    if (this.form.get('tipoPessoa').value === TipoPessoa.Cliente) {
      tipoPessoa = 0;
    } else if (this.form.get('tipoPessoa').value === TipoPessoa.Fornecedor) {
      tipoPessoa = 1;
    } else {
      tipoPessoa = 2;
    }

    const pessoaRequest: PessoaRequest = {
      nome: this.form.get('nome').value,
      telefones: this.form.get('telefones').value,
      email: this.form.get('email').value,
      tipoPessoa: tipoPessoa,
    } as PessoaRequest;

    if (this.tipoPessoa === TipoPessoa.Cliente) {
      pessoaRequest.cliCpf = this.form.get('cpf').value;
      pessoaRequest.cliLimiteCredito = this.form.get('limiteCredito').value;
    } else if (this.tipoPessoa === TipoPessoa.Fornecedor) {
      pessoaRequest.forCnpj = this.form.get('cnpj').value;
      pessoaRequest.forNomeContato = this.form.get('nomeContato').value;
    } else {
      pessoaRequest.venCpf = this.form.get('cpf').value;
      pessoaRequest.venMetaMensal = this.form.get('metaMensal').value;
    }

    this.pessoaService.cadastrar(pessoaRequest).subscribe(() => {
      alert('Cadastrado com sucesso');
      this.router.navigateByUrl('pessoa/listar');
    });
  }
}
