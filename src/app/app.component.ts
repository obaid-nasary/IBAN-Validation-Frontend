import { HttpErrorResponse } from '@angular/common/http';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { resourceLimits } from 'worker_threads';
import { Iban } from './iban';
import { IbanService } from './iban.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public ibans!: Iban[];
  // public checkIban!: Iban;
  // public ibana!: Iban [];
  public validIbans!: Iban[];
  public changeModelTitle!: string;


  constructor(private ibanService: IbanService){}

  ngOnInit(): void {
      this.getIbans();
  }

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

  public onAddIban(addForm: NgForm): void{
    document.getElementById('add-iban-form')!.click();
      this.ibanService.addIban(addForm.value).subscribe(
        (response: Iban) => {
          console.log(response);
          this.getIbans();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public onOpenModal(mode: string): void{
    console.log('hi');
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addIbanModal');
    }
    if (mode === 'theValid'){
      console.log('hello');
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
