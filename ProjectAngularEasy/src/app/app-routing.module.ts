import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatoComponent } from './candidato/candidato.component';
import { NovoCandidatoComponent } from './novo-candidato/novo-candidato.component';
import { CandidatoConhecimentoComponent } from './novo-candidato/candidato-conhecimento/candidato-conhecimento.component';

const routes: Routes = [
  { path: '', component: CandidatoComponent },
  { path: 'novo', component: NovoCandidatoComponent },
  { path: ':id', component: NovoCandidatoComponent },
  { path: 'editar/:id', component: NovoCandidatoComponent },
  { path: 'conhecimentos', component: CandidatoConhecimentoComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
