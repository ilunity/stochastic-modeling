export interface Inputs {
  question: string;
}

export interface QuestionFormProps {
  onSubmit: (data: Inputs) => void;
}
