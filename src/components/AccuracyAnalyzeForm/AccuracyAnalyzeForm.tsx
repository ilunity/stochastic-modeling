import React, { useEffect } from 'react';
import { AccuracyAnalyzeFormInputs, AccuracyAnalyzeFormProps } from './AccuracyAnalyzeForm.types';
import { Button, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

export const AccuracyAnalyzeForm: React.FC<AccuracyAnalyzeFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AccuracyAnalyzeFormInputs>();

  const { prob1, prob2, prob3, prob4 } = watch();


  useEffect(() => {
    const firstFourProbsSum = prob1 + prob2 + prob3 + prob4;
    setValue('prob5', Math.round((1 - firstFourProbsSum) * 100_000) / 100_000);

  }, [prob1, prob2, prob3, prob4]);

  return (
    <Stack
      component={'form'}
      spacing={2}
      direction={'column'}
      sx={{ width: 150 }}
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <TextField
        {...register('prob1', { required: true, setValueAs: Number })}
        label={'Prob 1'}
        error={!!errors.prob1}
      />
      <TextField
        {...register('prob2', { required: true, setValueAs: Number })}
        label={'Prob 2'}
        error={!!errors.prob2}
      />
      <TextField
        {...register('prob3', { required: true, setValueAs: Number })}
        label={'Prob 3'}
        error={!!errors.prob3}
      />
      <TextField
        {...register('prob4', { required: true, setValueAs: Number })}
        label={'Prob 4'}
        error={!!errors.prob4}
      />
      <TextField
        {...register('prob5', { required: false, setValueAs: Number })}
        label={'Prob 5'}
        error={!!errors.prob5}
        InputProps={{ disabled: true }}
        // value={watcher.prob5}
      />
      <TextField
        {...register('trials', { required: true, setValueAs: Number })}
        type={'number'}
        label={'Trials'}
        error={!!errors.trials}
      />
      <Button
        type={'submit'}
        variant={'outlined'}
      >
        Start
      </Button>
    </Stack>
  );
};
