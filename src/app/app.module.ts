// import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { IbanService } from './iban.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, FormsModule
  ],
  providers: [IbanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
