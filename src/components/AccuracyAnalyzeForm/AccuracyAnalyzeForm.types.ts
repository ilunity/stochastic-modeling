export interface AccuracyAnalyzeFormInputs {
  prob1: number;
  prob2: number;
  prob3: number;
  prob4: number;
  prob5: number;
  trials: number;
}

export interface AccuracyAnalyzeFormProps {
  onSubmit: (data: AccuracyAnalyzeFormInputs) => void;
}
