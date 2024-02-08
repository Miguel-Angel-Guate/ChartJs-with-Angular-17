export interface ChartData {
    values: number[];
    currentValues: number[];
    brands: string[];
    dataPoints: string[];
}

export interface DataChart {
    marcaText: string;
    subTitleColumn: string[];
    allDataPoints: string[];
    baseValues: number[];
    currentValues: number[];
    brands: string[];
    chartInstances: ChartData[];
}
