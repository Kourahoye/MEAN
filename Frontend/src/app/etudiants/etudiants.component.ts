import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EtudiantService } from '../etudiant.service';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css']
})
export class EtudiantsComponent {
  title = 'COURS';
  actionOnGoing = "Creation"
  creationMode:boolean = true
  departements:any;
  displayError:string|undefined
  etudiant = {
    firstname:"",
    lastname:"",
    matricule:"",
    departement : ""
  };
  searchForm:FormGroup;
  myForm:FormGroup;
  etudiants:any;
displaySucess: any|undefined;

  constructor(private service:EtudiantService, private fb:FormBuilder){
    this.myForm = this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      matricule:['',Validators.required],
      departement:['',Validators.required],
    })
    this.searchForm = this.fb.group({
      matricule:['',Validators.required]
    })
    this.getDepartements();
    this.getEtudiants();
    this.creationMode = true
    this.actionOnGoing = "Creation"
    this.displayError=""
    this.displaySucess=""
  }
  update(etudiant:any){
    this.creationMode = false
    this.actionOnGoing = "Modification"
    this.displayError = ""
    this.displaySucess=""
    this.etudiant.firstname = etudiant.firstname
    this.etudiant.lastname = etudiant.lastname
    this.etudiant.matricule = etudiant.matricule
    this.etudiant.departement = etudiant.departement.name
  }

  getDepartements(){
    this.service.getDepartement().subscribe({
      next:(response)=>{
        console.log(response)
        this.departements = response
      },
      error:(error)=>console.log(error)
    })
  }

  deleteEtudiant(matricule:string){
    this.service.deleteEtudiant(matricule).subscribe({
      next:(response)=>{
        console.log(response)
          this.myForm.reset()
          this.getDepartements()
          this.getEtudiants()
          this.creationMode = true
          this.actionOnGoing = "Creation"
          this.displaySucess = "Etudiant supprimé"
          this.displayError = ""
      },
      error:(error)=>console.log(error)
    })
  }
  getEtudiants(){
    this.service.getEtudiants().subscribe({
      next:(response)=>{
        this.etudiants = response
      },
      error:(error)=>console.log(error)
    })
  }


  enregistrer(){
    if (this.creationMode){
      if(this.myForm.valid){
        this.service.saveEtudiant(this.myForm.value).subscribe({
          next:(response)=>{
            this.myForm.reset()
            this.getDepartements()
            this.getEtudiants()
            this.displaySucess = "Enregistrement effectuer"
            this.displayError = ""
          },
          error:(error)=>{
            console.error(error)
            this.displayError  =  error.error.text
            this.displaySucess = ""
          }
        })

      }
    }else{
      this.service.updateEtudiant(this.myForm.value).subscribe({
        next:(response)=>{
          this.myForm.reset()
          this.getEtudiants()
          this.getDepartements()
          this.creationMode = true
          this.actionOnGoing = "Creation"
          this.displaySucess = "Modification effectuer"
          this.displayError = ""
        },
        error:(error)=>console.error(error)
      })
    }
    this.displayError = ""
    this.displaySucess=""
  }

  search(){
    if(this.searchForm.valid){
      this.displayError = ""
      this.displaySucess=""
      this.service.getTargetEtudiant(this.searchForm.value).subscribe({
        next:(response)=>{
          this.etudiants = []
          if(response)this.etudiants.push(response)
          else this.etudiants = []
          this.searchForm.reset()
        },
        error:(error)=>console.error(error)
      })

    }
}
}
