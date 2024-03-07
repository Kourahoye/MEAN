import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DepartementComponent } from './departement/departement.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EtudiantsComponent } from './etudiants/etudiants.component';

const routes: Routes = [
  { path: '', component: EtudiantsComponent, title:"Etudiant" },
  { path: 'etudiants', component: EtudiantsComponent, title:"Etudiant" },
  { path: 'departements', component: DepartementComponent, title:"Departement" },
  { path: '**', component: NotFoundComponent, title:"Page not found" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
