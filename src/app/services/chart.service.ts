import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private httpClient: HttpClient) { }

  getDataChart() {
    return this.httpClient.get('./assets/data/dataChart.json');
  }

}