import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { VendaRoutingModule } from './venda-routing.module';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ListarComponent } from './listar/listar.component';
import { VendaService } from './venda.service';


@NgModule({
  declarations: [CadastrarComponent, ListarComponent],
  imports: [
    SharedModule,
    VendaRoutingModule
  ],
  providers: [VendaService]
})
export class VendaModule { }
