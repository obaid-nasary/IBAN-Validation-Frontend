import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Iban } from './iban';
import { IbanService } from './iban.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public ibans!: Iban[];
  public validIbans!: Iban[];
  public changeModelTitle!: string;


  constructor(private ibanService: IbanService){}

  ngOnInit(): void {
      this.getIbans();
  }

  /**
   * Reads all the inserted and validated numbers and displays in table
   */
  public getIbans(): void{
    this.ibanService.getIbans().subscribe(
      (response: Iban[]) =>{
        this.ibans = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /**
   * Checks and prints only valid IBAN numbers log
   */
  public getValidIbans(): void{
    this.ibanService.getIbanByValid(1).subscribe(
      (response: Iban[]) =>{
        this.validIbans = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /**
   * Checks and prints only invalid IBAN numbers log
   */
  public getInValidIbans(): void{
    this.ibanService.getIbanByValid(0).subscribe(
      (response: Iban[]) =>{
        this.validIbans = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /**
   *
   * @param addForm takes IBAN number and sends for validation and adding
   */
  public onAddIban(addForm: NgForm): void{
    document.getElementById('add-iban-form')!.click();
      this.ibanService.addIban(addForm.value).subscribe(
        (response: Iban) => {
          alert("IBAN validated successfully");
          this.getIbans();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  /**
   *
   * @param mode displays Modals on button click based on mode
   */
  public onOpenModal(mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addIbanModal');
    }
    if (mode === 'theValid'){
      button.setAttribute('data-target', '#printValidModal');
      this.getValidIbans();
      this.changeModelTitle = "Valid IBAN Numbers Log";
    }
    if (mode === 'theInvalid'){
      button.setAttribute('data-target', '#printValidModal');
      this.getInValidIbans();
      this.changeModelTitle = "Invalid IBAN Numbers Log";
    }

    container?.appendChild(button);
    button.click();

  }
}
