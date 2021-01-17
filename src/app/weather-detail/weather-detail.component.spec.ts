import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DatePipe } from '@angular/common';

import {
  MatSnackBar,
  MatSnackBarModule,
  MatTableModule,
} from '@angular/material';

import { WeatherAppService } from '../service/weather-app/weather-app.service';
import { WeatherDetailComponent } from './weather-detail.component';
import { Overlay } from '@angular/cdk/overlay';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { WeatherServiceStub } from 'src/testing/weather-service-stub';
import { ActivatedRouteStub } from 'src/testing/activate-route-stub';

describe('WeatherDetailComponent', () => {
  let component: WeatherDetailComponent;
  let fixture: ComponentFixture<WeatherDetailComponent>;
  const activatedRouteStub = new ActivatedRouteStub();
  const mockActivatedRoute = {
    params: of({ city: 'london' })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [WeatherDetailComponent],
      providers: [
        DatePipe,
        MatSnackBar,
        Overlay,
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        { provide: WeatherAppService, useClass: WeatherServiceStub },
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatTableModule,
        MatSnackBarModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // activatedRouteStub.setParamMap({ city: 'London' });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch weather forecast of a given city for next 5 days', () => {
    expect(component.dataSource.data.length).toBe(5);
  });

  it('should navigate to weather-home page when Home button is clicked', () => {
    const navigateSpy = spyOn(component.router, 'navigate');
    component.goToHome();
    expect(navigateSpy).toHaveBeenCalledWith(['home']);
  });
});
