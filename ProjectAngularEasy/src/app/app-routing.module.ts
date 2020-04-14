import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatoComponent } from './candidato/candidato.component';
import { NovoCandidatoComponent } from './novo-candidato/novo-candidato.component';

const routes: Routes = [
  { path: '', component: CandidatoComponent },
  { path: 'novo', component: NovoCandidatoComponent },
  { path: ':id', component: NovoCandidatoComponent },
  { path: 'editar/:id', component: NovoCandidatoComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
