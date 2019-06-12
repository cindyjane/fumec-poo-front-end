import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CompraService } from '../compra.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Moment } from 'moment';
import { Compra } from '../shared/compra.model';

@Component({
  selector: 'siscom-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})

export class ListarComponent implements OnInit {
  public dataSource: any;
  public displayedColumns: any;
  public nome: FormControl;
  public dataInicio: FormControl;
  public dataTermino: FormControl;

  constructor(private compraService: CompraService, private router: Router) {
  }

  ngOnInit() {
    this.dataSource = [];
    this.displayedColumns = ['nome', 'data', 'acoes'];

    this.nome = new FormControl(null, [Validators.required]);
    this.dataInicio = new FormControl(null, [Validators.required]);
    this.dataTermino = new FormControl(null, [Validators.required]);

    this.nome.disable();

    this.nome.valueChanges.subscribe(this.onNomeChange);
    this.dataInicio.valueChanges.subscribe(this.onDatesChange);
    this.dataTermino.valueChanges.subscribe(this.onDatesChange);
  }

  public onNomeChange = () => {
    this.listarCompras(this.nome.value, this.dataInicio.value, this.dataTermino.value);
  }

  public onDatesChange = () => {
    if (this.dataInicio.valid && this.dataTermino.valid) {
      this.nome.enable({ emitEvent: false });
      this.listarCompras(this.nome.value, this.dataInicio.value, this.dataTermino.value);
    } else {
      this.nome.reset(null, { emitEvent: false });
      this.nome.disable({ emitEvent: false });
    }
  }

  public apagar = (compra: Compra) => {
    this.compraService.excluir(compra.num).subscribe(() => {
      alert(`Compra de ${compra.num} excluída com sucesso!`);
      this.listarCompras(this.nome.value, this.dataInicio.value, this.dataTermino.value);
    }, (err: HttpErrorResponse) => {
      console.log(err);
      alert(err.error.message);
    });
  }

  public listarCompras = (nome: string, dataInicio: Moment, dataTermino: Moment) => {
    const dataInicioFormatted = dataInicio.format('YYYY-MM-DD');
    const dataTerminoFormatted = dataTermino.format('YYYY-MM-DD');


    this.compraService.listar(nome, dataInicioFormatted, dataTerminoFormatted).subscribe((compras: Compra[]) => {
      this.dataSource = compras;
    });
  }

  public onAddClick() {
    this.router.navigateByUrl('compra/cadastrar');
  }
}
