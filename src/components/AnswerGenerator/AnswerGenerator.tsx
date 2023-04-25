import React, { useState } from 'react';
import { ANSWER_GENERATOR_TYPES, AnswerGeneratorProps } from './AnswerGenerator.types';
import { Divider, Stack } from '@mui/material';
import { QuestionForm } from '../QuestionForm';
import { Random } from '../../utils';
import { magicBallAnswers } from '../../utils/magic-ball';

export const AnswerGenerator: React.FC<AnswerGeneratorProps> = ({ type }) => {
  const [answer, setAnswer] = useState<string>('');

  const onSubmit = () => {
    if (type === ANSWER_GENERATOR_TYPES.BOOLEAN) {
      const randomBoolean = Random.getBoolean();
      return setAnswer(randomBoolean ? 'Да' : 'Нет');
    }

    const randomAnswer = Random.getFromMultipleEvents({ arraySize: magicBallAnswers.length });
    setAnswer(magicBallAnswers[randomAnswer]);
  };

  return (
    <Stack
      direction={'row'}
      divider={<Divider orientation={'vertical'} flexItem color={'#2196f3'} />}
      spacing={2}
    >
      <QuestionForm onSubmit={onSubmit} />
      <Stack justifyContent={'center'}>
        {answer || 'Задайте вопрос'}
      </Stack>
    </Stack>
  );
};
