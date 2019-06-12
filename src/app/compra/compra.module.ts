import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CompraRoutingModule } from './compra-routing.module';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ListarComponent } from './listar/listar.component';
import { CompraService } from './compra.service';


@NgModule({
    declarations: [CadastrarComponent, ListarComponent],
    imports: [
        SharedModule,
        CompraRoutingModule
    ],
    providers: [CompraService]
})
export class CompraModule { }
