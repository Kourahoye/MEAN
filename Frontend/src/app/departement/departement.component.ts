import { Component } from '@angular/core';
import { EtudiantService } from '../etudiant.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent {
  myForm:FormGroup;
  departements:any;
  actionOnGoing: any;
  departement = {
    _id:"",
    name:""
  }
  displayError: any|undefined;
  displaySucess:any|undefined;
  creationMode:boolean = true;
  searchForm: FormGroup;
  constructor(private service:EtudiantService, private fb:FormBuilder){
    this.myForm = this.fb.group({
      name:['',Validators.required]
    })
    this.searchForm = this.fb.group({
      name:['',Validators.required]
    })
    this.getDepartements();
    this.creationMode = true
    this.actionOnGoing = "Creation"
    this.displayError=""
    this.displaySucess=""
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

  enregistrer(){
     if (this.creationMode){
      if(this.myForm.valid){
        this.service.saveDepartement(this.myForm.value).subscribe({
          next:(response)=>{
            this.myForm.reset()
            this.getDepartements()
            this.displaySucess = "Enregistrement effectuer"
            this.displayError=""
          },
          error:(error)=>{
            console.error(error)
             this.displayError  =  error.error.text
          }
        })
      }
    }else{
        this.departement.name = this.myForm.value.name
        this.service.updateDepatrtement(this.departement).subscribe({
        next:(response)=>{
          this.myForm.reset()
          this.getDepartements()
          this.creationMode = true
          this.actionOnGoing = "Creation"
          this.displaySucess = "Modification effectuer"
          this.displayError = ""
          console.log(response)
        },
        error:(error)=>console.error(error)
      })
    }
    this.displayError = ""
    this.displaySucess = ""
  }

deleteDepartement(id:string){
  this.service.deleteDepartement(id).subscribe({
    next:(response)=>{
      console.log(response)
        this.myForm.reset()
        this.getDepartements()
        this.actionOnGoing = "Creation"
        this.displaySucess = `Departement supprimer. ${response.etudiant.deletedCount} etudiant(s) impacté(s) et supprimé(s)`
        this.displayError = ""
    },
    error:(error)=>console.log(error)
  })
}

update(name:string,id:string){
  this.creationMode = false
  this.actionOnGoing = "Modification"
  this.displayError = ""
  this.displaySucess = ""
  this.departement.name = name
  this.departement._id = id
}
search(){
  if(this.searchForm.valid){
    this.displayError = ""
    this.displaySucess = ""
    this.service.getTargetDepartement(this.searchForm.value).subscribe({
      next:(response)=>{
        this.departements = []
        if(response)this.departements.push(response)
        else  this.departements = []
        this.searchForm.reset()
      },
      error:(error)=>console.error(error)
    })

  }
}
}
