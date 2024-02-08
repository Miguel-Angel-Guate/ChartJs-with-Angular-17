import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DataChart } from '../types/chart';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-horizontal-bar-chart',
  standalone: true,
  imports: [CommonModule, ChartComponent, HeaderComponent],
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrl: './horizontal-bar-chart.component.css'
})
export class HorizontalBarChartComponent {

  private _dataContent!: DataChart;

  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  @Input() set dataChartContent(value: DataChart) {
    this._dataContent = value;
    if (value) {
      this.initializeChartInstancesFromDataContent();
    }
  }

  get dataChartContent(): any {
    return this._dataContent;
  }

  private initializeChartInstancesFromDataContent() {
    const { baseValues, currentValues, brands, allDataPoints, chartInstances } = this.dataChartContent;
    // Assuming the length of currentValues and brands arrays are the same and dictate the number of charts
    for (let i = 0; i < brands.length; i++) {
      // For each brand, create a chart instance
      chartInstances.push({
        values: baseValues, // Using the same baseValues for all instances
        currentValues: [currentValues[i]], // Selecting a single currentValue for each instance
        brands: [brands[i]], // Selecting a single brand for each instance
        dataPoints: allDataPoints.slice(i * 4, (i + 1) * 4) // Assuming 4 data points per brand
      });
    }
  }


}
