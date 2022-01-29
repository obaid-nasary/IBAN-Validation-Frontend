import { HttpErrorResponse } from '@angular/common/http';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
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
  public checkIban!: Iban;


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

  public onAddIban(addForm: NgForm): void{
    document.getElementById('add-employee-form')!.click();
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

  public onOpenModal(iban: Iban, mode: string): void{
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
    }
    if (mode === 'theInvalid'){
      button.setAttribute('data-target', '#printInValidModal');
    }

    container?.appendChild(button);
    button.click();

  }
}
