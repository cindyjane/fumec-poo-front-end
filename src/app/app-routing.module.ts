import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'pessoa', loadChildren: 'src/app/pessoa/pessoa.module#PessoaModule' },
  { path: 'produto', loadChildren: 'src/app/produto/produto.module#ProdutoModule' },
  { path: '', redirectTo: 'pessoa', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
