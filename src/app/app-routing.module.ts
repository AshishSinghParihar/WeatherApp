import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { WeatherHomeComponent } from './weather-home/weather-home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: WeatherHomeComponent },
  { path: 'forecast/:city', component: WeatherDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
