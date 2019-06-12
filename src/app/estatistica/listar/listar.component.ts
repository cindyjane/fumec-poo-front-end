import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TipoPessoa } from 'src/app/pessoa/shared/tipo-pessoa.enum';
import { Estatistica } from '../shared/estatistica.model';
import { EstatisticaService } from '../estatistica.service';
import { Moment } from 'moment';

@Component({
  selector: 'siscom-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})

export class ListarComponent implements OnInit {
  public dataSource: any;
  public displayedColumns: any;
  public tipoPessoa: FormControl;
  public dataInicio: FormControl;
  public dataTermino: FormControl;
  public tipoPessoas: TipoPessoa[];

  constructor(private estatisticaService: EstatisticaService) {
    this.tipoPessoas = Object.values(TipoPessoa);
  }

  ngOnInit() {
    this.dataSource = [];
    this.displayedColumns = ['nome', 'vezesAcao', 'valorTotal'];

    this.tipoPessoa = new FormControl(null, [Validators.required]);
    this.dataInicio = new FormControl(null, [Validators.required]);
    this.dataTermino = new FormControl(null, [Validators.required]);

    this.tipoPessoa.valueChanges.subscribe(this.onTipoPessoaChange);
    this.dataInicio.valueChanges.subscribe(this.onDatesChange);
    this.dataTermino.valueChanges.subscribe(this.onDatesChange);
  }

  public onTipoPessoaChange = () => {
    if (this.tipoPessoa.valid && this.dataInicio.valid && this.dataTermino.valid) {
      this.listarEstatisticas(this.tipoPessoa.value, this.dataInicio.value, this.dataTermino.value);
    }
  }

  public onDatesChange = () => {
    if (this.tipoPessoa.valid && this.dataInicio.valid && this.dataTermino.valid) {
      this.listarEstatisticas(this.tipoPessoa.value, this.dataInicio.value, this.dataTermino.value);
    }
  }

  public listarEstatisticas = (tipoPessoa: TipoPessoa, dataInicio: Moment, dataTermino: Moment) => {
    const dataInicioFormatted = dataInicio.format('YYYY-MM-DD');
    const dataTerminoFormatted = dataTermino.format('YYYY-MM-DD');


    this.estatisticaService.listar(tipoPessoa, dataInicioFormatted, dataTerminoFormatted).subscribe((estatisticas: Estatistica[]) => {
      this.dataSource = estatisticas;
    });
  }
}
