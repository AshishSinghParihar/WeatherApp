import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { WeatherAppService } from '../service/weather-app/weather-app.service';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.scss'],
})
export class WeatherHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  cityList: string[] = ['london', 'paris', 'rome', 'berlin', 'barcelona'];
  formattedWeatherData = [];
  displayedColumns: string[] = ['name', 'temperature', 'sunrise', 'sunset'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  citiesWeatherSubscription: Subscription;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild('input', { static: true }) filterField: ElementRef;

  constructor(private router: Router, private weatherAppService: WeatherAppService) {}

  ngOnInit() {
    this.getCitiesWeather();
  }

  /**
   * Add sort feature to Angular Material table after view rendering in initialized.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /**
   * Service call to get weather report for a list of cities.
   */
  getCitiesWeather() {
    this.citiesWeatherSubscription = this.weatherAppService
      .getCitiesWeather(this.cityList)
      .subscribe((resp: any) => {
        this.formatData(resp);
      });
  }

  /**
   *
   * @param report Array of weather report for all 5 cities
   *
   * This method iterates over list of weather reports for different cities in order to create
   * an array with new object containing required details in specific format. E.g. formatting time and temperature.
   */
  formatData(report: any) {
    // tslint:disable-next-line: forin
    for (const index in this.cityList) {
      const data: any = {};
      data.name = report[index].name;
      data.temperature = this.weatherAppService.formatTemperature(
        report[index].main.temp
      );
      data.sunrise = this.weatherAppService.formatTime(
        report[index].sys.sunrise,
        report[index].timezone
      );
      data.sunset = this.weatherAppService.formatTime(
        report[index].sys.sunset,
        report[index].timezone
      );
      this.formattedWeatherData.push(data);
      this.dataSource.data = this.formattedWeatherData;
    }
  }

  /**
   *
   * @param city Name of the city
   *
   * This method takes the name of a city as a parameter and navigate to Weather-Details page to show the
   * weather forecast of next 5 days.
   */
  showWeatherForecast(city: string) {
    this.router.navigate(['/forecast/' + city]);
  }

  /**
   *
   * @param event Event triggered when input is given to the filter text field
   *
   * This method filters the data source for Mat-Table based on the input provided in the 'Filter' text field.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Unsubscribing from the Observable in order to prevent memory leakage.
   */
  ngOnDestroy() {
    this.citiesWeatherSubscription.unsubscribe();
  }
}
