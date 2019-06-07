import { NgModule } from '@angular/core';

import { PessoaRoutingModule } from './pessoa-routing.module';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { SharedModule } from '../shared/shared.module';
import { PessoaService } from './pessoa.service';
import { ListarComponent } from './listar/listar.component';

@NgModule({
  declarations: [CadastrarComponent, ListarComponent],
  imports: [
    SharedModule,
    PessoaRoutingModule
  ],
  providers: [PessoaService]
})
export class PessoaModule { }
