import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(private http:HttpClient) { }

  BASE_URL = "http://localhost:3000";

  getDepartement():Observable<any>{
    return this.http.get(`${this.BASE_URL}/departement/`)
  }
  saveDepartement(value:any):Observable<any>{
    return this.http.post(`${this.BASE_URL}/departement/`,value)
  }
  deleteDepartement(value:any):Observable<any>{
    return this.http.post(`${this.BASE_URL}/departement/delete`,{_id:value})
  }
  updateDepatrtement(value:any):Observable<any>{
    return this.http.post(`${this.BASE_URL}/departement/update`,value)
  }
  getTargetDepartement(value:any):Observable<any>{
    return this.http.post(`${this.BASE_URL}/departement/target`,value)
  }


  getEtudiants():Observable<any>{
    return this.http.get(`${this.BASE_URL}/etudiant/`)
  }

  getTargetEtudiant(value:any):Observable<any>{
    return this.http.post(`${this.BASE_URL}/etudiant/target`,value)
  }

  saveEtudiant(value:any):Observable<any>{
    return this.http.post(`${this.BASE_URL}/etudiant/`,value)
  }
  updateEtudiant(value:any):Observable<any>{
    return this.http.post(`${this.BASE_URL}/etudiant/update`,value)
  }
  deleteEtudiant(value:any):Observable<any>{
    return this.http.post(`${this.BASE_URL}/etudiant/delete`,{matricule:value})
  }
}
