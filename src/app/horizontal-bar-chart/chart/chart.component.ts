import {
  Component,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
interface ChartData {
  values: number[];
  currentValues: number[];
  brands: string[];
}



@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;

  private _chartData!: ChartData;
  private _dataPoints!: string[];
  chart: Chart | null = null;

  @Input() set chartData(data: ChartData) {
    this._chartData = data;
    if (this.myChart) {
      this.setUpChart();
    }
  }


  get chartData(): ChartData {
    return this._chartData;
  }

  @Input() set dataPoints(data: string[]) {
    this._dataPoints = data;
  }

  get dataPoints(): string[] {
    return this._dataPoints;
  }
 ngAfterViewInit(): void {
  Chart.register(...registerables, ChartDataLabels);

  // Delay setup to ensure ViewChild is available
  if (this._chartData) {
    this.setUpChart();
  }
  }

  private setUpChart(): void {
    if (this._chartData?.values && this._chartData?.currentValues && this._chartData?.brands) {
      // Previous setUpChart logic...
      const highestValue = Math.max(...this._chartData.values);
      const currentValuesPercentages = this._chartData.currentValues.map(value => (value / highestValue) * 100);
      const remainingValuesPercentages = currentValuesPercentages.map(current => 100 - current);
      const printValue = this._chartData.currentValues.map(value => `${value}M`);
  
      // Initialize or update chart with this._chartData
      this.initializeChart(this._chartData.brands, currentValuesPercentages, remainingValuesPercentages, printValue);
    }
  }
  

  private initializeChart(brands: string[], currentValuesPercentages: number[], remainingValuesPercentages: number[], printValue: string[]): void {
    // Ensure to destroy the existing chart instance before creating a new one to prevent memory leaks
    if (this.chart) {
      this.chart.destroy();
    }

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: brands,
        datasets: [
          {
            data: currentValuesPercentages,
            label: '',
            backgroundColor: 'black',
            borderWidth: 0,
            borderColor: 'transparent',
            categoryPercentage: 1,
            barPercentage: 1,
            datalabels: {
              color: 'white',
              anchor: 'end',
              align: 'left',
              formatter: (value, context) => {
                return printValue[context.dataIndex];
              },
            },
          },
          {
            label: '',
            categoryPercentage: 0.2,
            barThickness: 12,
            barPercentage: 0.4,
            data: remainingValuesPercentages,
            backgroundColor: 'rgba(0, 133, 57, 0.10)',
            borderWidth: 0,
            borderColor: 'transparent',
            datalabels: {
              color: 'transparent',
            },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        events: [],
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
          y: {
            stacked: true,
            ticks: {
              mirror: true,
              labelOffset: -20,
            },
            grid: {
              display: false,
              drawOnChartArea: false,
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              boxWidth: 0,
            },
          },
        },
      },
    };

    this.chart = new Chart(this.myChart.nativeElement, config);
  }




}
