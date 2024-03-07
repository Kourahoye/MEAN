import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }  from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartementComponent } from './departement/departement.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { EtudiantsComponent } from './etudiants/etudiants.component';


@NgModule({
  declarations: [
    AppComponent,
    DepartementComponent,
    NotFoundComponent,
    EtudiantsComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
     RouterLink,
     RouterLinkActive,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
