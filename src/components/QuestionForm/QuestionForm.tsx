import React from 'react';
import { Inputs, QuestionFormProps } from './QuestionForm.types';
import { Button, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

export const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  return (
    <Stack
      component={'form'}
      spacing={2}
      direction={'row'}
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <TextField
        {...register('question', { required: true })}
        label={'Вопрос'}
        error={!!errors.question}
      />
      <Button
        type={'submit'}
        variant={'outlined'}
      >
        Ответ
      </Button>
    </Stack>
  );
};
