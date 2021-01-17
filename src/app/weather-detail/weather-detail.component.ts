import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MatSort, MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';

import { WeatherAppService } from '../service/weather-app/weather-app.service';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss'],
})
export class WeatherDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  cityDetails: any = {};
  weatherForecast: any[] = [];
  displayedColumns: string[] = ['date', 'temperature', 'seaLevel'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  weatherForecastSubscription: Subscription;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private weatherAppService: WeatherAppService,
    private snackBar: MatSnackBar
  ) {}

  /**
   * As the component loads, browser's URL parameter is read to get city name
   * for which weather forecast has to be fetched by call the 'forecast' API with this
   * city name as query parameter.
   */
  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.cityDetails.name = params.city;
      this.getWeatherForecast();
    });
  }

  /**
   * Add sort feature to Angular Material table after view rendering in initialized.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /**
   * API call to get weather forecast of an input city.
   */
  getWeatherForecast() {
    this.weatherForecastSubscription = this.weatherAppService
      .getCityWeatherForecast(this.cityDetails.name)
      .subscribe((resp: any) => {
        this.formatWeatherReport(resp);
      },
      (error: any) => {
        if (error.status === 404) {
          this.snackBar.open('City \'' + this.cityDetails.name + '\' not found.', 'Okay', {
            duration: 10000,
          });
        }
      });
  }

  /**
   *
   * @param report Weather report for an input city
   *
   * This method filters all weather reports at 09:00:00 and creates a new object containing
   * formatted values.
   */
  formatWeatherReport(report: any) {
    this.cityDetails.city = report.city.name;
    this.cityDetails.country = report.city.country;
    this.weatherForecast = [];
    report.list.forEach((w: any) => {
      const formattedReport: any = {};
      if (w.dt_txt.includes('09:00:00')) {
        formattedReport.date = this.weatherAppService.formatDate(w.dt);
        formattedReport.temperature = this.weatherAppService.formatTemperature(
          w.main.temp
        );
        formattedReport.seaLevel = w.main.sea_level;
        this.weatherForecast.push(formattedReport);
      }
    });
    this.dataSource.data = this.weatherForecast;
  }

  /**
   * Navigate to the home page.
   */
  goToHome() {
    this.router.navigate(['home']);
  }

  /**
   * Unsubscribing from the Observable in order to prevent memory leakage.
   */
  ngOnDestroy() {
    this.weatherForecastSubscription.unsubscribe();
  }
}
