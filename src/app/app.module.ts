import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSnackBar,
  MatSnackBarContainer,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherHomeComponent } from './weather-home/weather-home.component';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';

@NgModule({
  declarations: [AppComponent, WeatherHomeComponent, WeatherDetailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [DatePipe, MatSnackBar],
  bootstrap: [AppComponent],
  entryComponents: [MatSnackBarContainer]
})
export class AppModule {}
