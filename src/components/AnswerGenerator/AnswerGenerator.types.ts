export enum ANSWER_GENERATOR_TYPES {
  BOOLEAN = 'BOOLEAN',
  MAGIC_BALL = 'MAGIC_BALL',
}

export interface AnswerGeneratorProps {
  type: ANSWER_GENERATOR_TYPES;
}
