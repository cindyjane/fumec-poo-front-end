import { NgModule } from '@angular/core';

import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { SharedModule } from '../shared/shared.module';

import { ListarComponent } from './listar/listar.component';
import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoService } from './produto.service';

@NgModule({
    declarations: [CadastrarComponent, ListarComponent],
    imports: [
        SharedModule,
        ProdutoRoutingModule
    ],
    providers: [ProdutoService]
})
export class ProdutoModule { }
