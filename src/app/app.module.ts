import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CadastrarComponent } from './produto/cadastrar/cadastrar.component';
import { ListarComponent } from './produto/listar/listar.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastrarComponent,
    ListarComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
