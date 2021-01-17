import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { of } from 'rxjs';

export class WeatherServiceStub {
  constructor(private datePipe: DatePipe) {}

  getCitiesWeather(cityList: string[]) {
    const reqList = [];
    cityList.forEach((c: string) => reqList.push(this.getCityWeather(c)));

    return forkJoin(reqList);
  }

  getCityWeather(city: string) {
    const data = require('../assets/sample-data/weather.json');
    return of(data);
  }

  getCityWeatherForecast(city: string) {
    const data = require('../assets/sample-data/forecast.json');
    return of(data);
  }

  addTimezoneOffsetToDate(dt: number, timezone: number) {
    const targetTime = new Date(dt * 1000);
    const tzDifference = timezone / 60 + targetTime.getTimezoneOffset();
    return targetTime.getTime() + tzDifference * 60 * 1000;
  }

  formatTime(dt: number, timezone: number) {
    return this.datePipe.transform(
      this.addTimezoneOffsetToDate(dt, timezone),
      'hh:mm a'
    );
  }

  formatDate(input: number) {
    return this.datePipe.transform(input * 1000, 'dd MMM, yyyy');
  }

  formatTemperature(input: number) {
    return input + ' K';
  }
}
