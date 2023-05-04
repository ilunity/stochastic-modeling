export interface AccuracyChartData {
  name: string;
  freq: number;
  expectation: number;
}

export interface AccuracyAnalyzeChartProps {
  data: AccuracyChartData[];
}
