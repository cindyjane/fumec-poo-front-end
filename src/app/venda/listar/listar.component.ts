import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { Moment } from 'moment';

import { TipoPessoa } from 'src/app/pessoa/shared/tipo-pessoa.enum';
import { VendaService } from '../venda.service';
import { Venda } from '../shared/venda.model';


@Component({
  selector: 'siscom-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  public dataSource: any;
  public displayedColumns: any;
  public tipoPessoa: FormControl;
  public nome: FormControl;
  public dataInicio: FormControl;
  public dataTermino: FormControl;
  public tipoPessoas: TipoPessoa[];

  constructor(private vendaService: VendaService, private router: Router) {
    this.tipoPessoas = Object.values(TipoPessoa).filter((tipoPessoa: TipoPessoa) => tipoPessoa !== TipoPessoa.Fornecedor);
  }

  ngOnInit() {
    this.dataSource = [];
    this.displayedColumns = ['nome', 'data', 'acoes'];

    this.tipoPessoa = new FormControl(null, [Validators.required]);
    this.nome = new FormControl(null, [Validators.required]);
    this.dataInicio = new FormControl(null, [Validators.required]);
    this.dataTermino = new FormControl(null, [Validators.required]);

    this.nome.disable();

    this.tipoPessoa.valueChanges.subscribe(this.onTipoPessoaChange);
    this.nome.valueChanges.subscribe(this.onNomeChange);
    this.dataInicio.valueChanges.subscribe(this.onDatesChange);
    this.dataTermino.valueChanges.subscribe(this.onDatesChange);
  }

  public onTipoPessoaChange = () => {
    if (this.dataInicio.valid && this.dataTermino.valid) {
      this.nome.enable();
    }
  }

  public onNomeChange = () => {
    this.listarVendas(this.nome.value, this.tipoPessoa.value, this.dataInicio.value, this.dataTermino.value);
  }

  public onDatesChange = () => {
    if (this.tipoPessoa.valid && this.dataInicio.valid && this.dataTermino.valid) {
      this.nome.enable({ emitEvent: false });
      this.listarVendas(this.nome.value, this.tipoPessoa.value, this.dataInicio.value, this.dataTermino.value);
    } else {
      this.nome.reset(null, { emitEvent: false });
      this.nome.disable({ emitEvent: false });
    }
  }

  public apagar = (venda: Venda) => {
    this.vendaService.excluir(venda.num).subscribe(() => {
      alert(`Venda de ${venda.num} excluída com sucesso!`);
      this.listarVendas(this.nome.value, this.tipoPessoa.value, this.dataInicio.value, this.dataTermino.value);
    }, (err: HttpErrorResponse) => {
      console.log(err);
      alert(err.error.message);
    });
  }

  public listarVendas = (nome: string, tipoPessoa: TipoPessoa, dataInicio: Moment, dataTermino: Moment) => {
    const dataInicioFormatted = dataInicio.format('YYYY-MM-DD');
    const dataTerminoFormatted = dataTermino.format('YYYY-MM-DD');


    this.vendaService.listar(nome, tipoPessoa, dataInicioFormatted, dataTerminoFormatted).subscribe((vendas: Venda[]) => {
      this.dataSource = vendas;
    });
  }

  public onAddClick() {
    this.router.navigateByUrl('venda/cadastrar');
  }
}
