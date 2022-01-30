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

  /**
   *
   * @returns List of all the inserted IBAN numbers
   */
   public getIbans(): Observable<Iban[]>{
     return this.http.get<Iban[]>(`${this.apiServerUrl}/iban`);
   }

   /**
    *
    * @param valid takes a number, 1 for true/valid and 0 for false/invalid
    * @returns log of the IBAN numbers inserted filtered by validity
    */
   public getIbanByValid(valid: number): Observable<any>{
    return this.http.get<Iban[]>(`${this.apiServerUrl}/iban/${valid}`);
  }

  /**
   *
   * @param iban takes the IBAN number
   * @returns adding and sending the data to database
   */
   public addIban(iban: Iban): Observable<Iban> {
     return this.http.post<Iban>(`${this.apiServerUrl}/iban/`, iban);
   }


}



