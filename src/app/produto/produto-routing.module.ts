import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    // { path: 'cadastrar', component: CadastrarComponent, data: { title: 'Cadastrar Produto' } },
    // { path: 'listar', component: ListarComponent, data: { title: 'Listar Produto' } },
    { path: '', redirectTo: 'listar', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProdutoRoutingModule { }
