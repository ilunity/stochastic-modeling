export interface NormalDistributionFormProps {
  onSubmit: (data: NormalDistributionInputs) => void;
}

export interface NormalDistributionInputs {
  mean: number;
  variance: number;
  sampleSize: number;
}
