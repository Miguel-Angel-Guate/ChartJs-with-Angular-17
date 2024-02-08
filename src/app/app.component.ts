import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartService } from './services/chart.service';
import { DataChart } from './types/chart';
import { HttpClientModule } from '@angular/common/http';
import { HorizontalBarChartComponent } from './horizontal-bar-chart/horizontal-bar-chart.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, HorizontalBarChartComponent],
  providers: [ChartService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chartJs with Angular 17';

  dataChartContent!:DataChart

  constructor(private appService:ChartService) {
    this.appService.getDataChart().subscribe((res)=> {
      console.log("🚀 ~ AppComponent ~ this.appService.getDataChart ~ res:", res)
      this.dataChartContent = res as DataChart

    })
  }


}
