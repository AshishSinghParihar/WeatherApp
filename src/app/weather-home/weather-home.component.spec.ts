import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
} from '@angular/material';

import { WeatherHomeComponent } from './weather-home.component';
import { WeatherAppService } from '../service/weather-app/weather-app.service';
import { WeatherServiceStub } from 'src/testing/weather-service-stub';

describe('WeatherHomeComponent', () => {
  let component: WeatherHomeComponent;
  let fixture: ComponentFixture<WeatherHomeComponent>;
  const navigateSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [WeatherHomeComponent],
      providers: [DatePipe, { provide: Router, useValue: navigateSpy }, {provide: WeatherAppService, useClass: WeatherServiceStub}],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch weather report of 5 cities', () => {
    expect(component.formattedWeatherData.length).toBe(5);
  });

  it('should navigate to weather-details page with input city name as parameter', () => {
    const city = 'London';
    component.showWeatherForecast(city);
    expect(navigateSpy.navigate).toHaveBeenCalledWith(['/forecast/' + city]);
  });
});
