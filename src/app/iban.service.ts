import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iban } from './iban';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IbanService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

   public getIbans(): Observable<Iban[]>{
     return this.http.get<Iban[]>(`${this.apiServerUrl}/iban`);
   }

   public getIbanByValid(valid: number): Observable<any>{
    return this.http.get<Iban[]>(`${this.apiServerUrl}/iban/${valid}`);
  }

   public addIban(iban: Iban): Observable<Iban> {
     return this.http.post<Iban>(`${this.apiServerUrl}/iban/`, iban);
   }


}



