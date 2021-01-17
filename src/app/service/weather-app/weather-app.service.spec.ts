import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { WeatherAppService } from './weather-app.service';

describe('WeatherAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [HttpClient, DatePipe],
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: WeatherAppService = TestBed.get(WeatherAppService);
    expect(service).toBeTruthy();
  });

  it('should return time in desired format by adding offset timezone to given UTC timstamp', () => {
    const service: WeatherAppService = TestBed.get(WeatherAppService);
    const UTCTimestamp = 1610782671;
    const timezone = 3600;
    const formattedDate = service.formatTime(UTCTimestamp, timezone);
    expect(formattedDate).toBe('08:37 AM');
  });

  it('should format given UTC timestamp into desired date format', () => {
    const service: WeatherAppService = TestBed.get(WeatherAppService);
    const UTCTimestamp = 1610874000;
    const formattedDate = service.formatDate(UTCTimestamp);
    expect(formattedDate).toBe('17 Jan, 2021');
  });

  it('should format given temperature into Kelvin (K)', () => {
    const service: WeatherAppService = TestBed.get(WeatherAppService);
    const temp = 280;
    const formattedTemp = service.formatTemperature(temp);
    expect(formattedTemp).toBe(temp + ' K');
  });
});
