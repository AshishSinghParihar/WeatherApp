import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { forkJoin, of } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherAppService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  /**
   *
   * @param cityList List of name of cities in string
   *
   * This method returns an array of responses containing weather report of a list of cities.
   */
  getCitiesWeather(cityList: string[]) {
    const reqList = [];
    cityList.forEach((c: string) => reqList.push(this.getCityWeather(c)));

    return forkJoin(reqList);
  }

  /**
   *
   * @param city Name of the city
   *
   * Get request call to retreive current weather report of a city.
   */
  getCityWeather(city: string) {
    // const data = require('../../assets/sample-data/weather.json');
    // return of(data);
    return this.http.get(
      environment.baseURL +
        '/weather?q=' +
        city +
        '&appid=' +
        environment.APP_ID
    );
  }

  /**
   *
   * @param city Name of the city
   *
   * GET request call to retreive weather forecast for a city for next 5 days.
   */
  getCityWeatherForecast(city: string) {
    // const data = require('../../assets/sample-data/forecast.json');
    // return of(data);
    return this.http.get(
      environment.baseURL +
        '/forecast?q=' +
        city +
        '&appid=' +
        environment.APP_ID
    );
  }

  /**
   *
   * @param dt UTC timestamp in seconds
   * @param timezone Timezone offset in seconds
   *
   * Adding timezone difference ti UTC timestamp.
   */
  addTimezoneOffsetToDate(dt: number, timezone: number) {
    const targetTime = new Date(dt * 1000);
    const tzDifference = timezone / 60 + targetTime.getTimezoneOffset();
    return targetTime.getTime() + tzDifference * 60 * 1000;
  }

  /**
   *
   * @param dt UTC timestamp in seconds
   * @param timezone Timezone offset in seconds
   *
   * This method returns time in 'hh:mm a' format by adding the timezone offset to input UTC timestamp.
   * This is done to show the local time in respective cities.
   */
  formatTime(dt: number, timezone: number) {
    return this.datePipe.transform(
      this.addTimezoneOffsetToDate(dt, timezone),
      'hh:mm a'
    );
  }

  /**
   *
   * @param input UTC timestamp in seconds
   *
   * This method converts any input UTC timestamp in seconds into 'dd MMM, yyyy' format
   * using DatePipe.
   */
  formatDate(input: number) {
    return this.datePipe.transform(input * 1000, 'dd MMM, yyyy');
  }

  /**
   *
   * @param input Temperature in Kelvin
   *
   * This method formatsthe given temperature (in Kelvin) into desired format (here K).
   * It can be used to change all temperature formats being used across application by modifying
   * the method definition/logic.
   */
  formatTemperature(input: number) {
    return input + ' K';
  }
}
