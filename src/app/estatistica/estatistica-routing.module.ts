import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarComponent } from './listar/listar.component';

const routes: Routes = [
    { path: '', component: ListarComponent, data: { title: 'Listar Estatistica' } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EstatisticaRoutingModule { }
