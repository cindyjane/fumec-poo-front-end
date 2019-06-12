import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { EstatisticaRoutingModule } from './estatistica-routing.module';
import { ListarComponent } from './listar/listar.component';
import { EstatisticaService } from './estatistica.service';


@NgModule({
    declarations: [ListarComponent],
    imports: [
        SharedModule,
        EstatisticaRoutingModule
    ],
    providers: [EstatisticaService]
})
export class EstatisticaModule { }
