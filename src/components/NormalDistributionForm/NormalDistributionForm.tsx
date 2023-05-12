import React from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { NormalDistributionFormProps, NormalDistributionInputs } from './NormalDistributionForm.types';

export const NormalDistributionForm: React.FC<NormalDistributionFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NormalDistributionInputs>();

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
        {...register('mean', { required: true, setValueAs: Number })}
        label={'Mean'}
        error={!!errors.mean}
      />
      <TextField
        {...register('variance', { required: true, setValueAs: Number })}
        label={'Variance'}
        error={!!errors.variance}
      />
      <TextField
        {...register('sampleSize', { required: true, setValueAs: Number })}
        label={'Sample size'}
        error={!!errors.sampleSize}
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
