import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ListarComponent } from './listar/listar.component';

const routes: Routes = [
  { path: 'cadastrar', component: CadastrarComponent, data: { title: 'Cadastrar Pessoa' } },
  { path: 'listar', component: ListarComponent, data: { title: 'Listar Pessoa' } },
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoaRoutingModule { }
