import React, { useState } from 'react';
import { AccuracyAnalyzeProps } from './AccuracyAnalyze.types';
import { AccuracyAnalyzeChart } from '../AccuracyAnalyzeChart';
import { AccuracyAnalyzeForm } from '../AccuracyAnalyzeForm';
import { Stack } from '@mui/material';
import { AccuracyAnalyzeFormInputs } from '../AccuracyAnalyzeForm/AccuracyAnalyzeForm.types';
import { AccuracyChartData } from '../AccuracyAnalyzeChart/AccuracyAnalyzeChart.types';
import { Random } from '../../utils';

export const AccuracyAnalyze: React.FC<AccuracyAnalyzeProps> = () => {
  const [chartData, setChartData] = useState<AccuracyChartData[]>([]);

  const startTrials = ({ trials, ...probs }: AccuracyAnalyzeFormInputs) => {
    const probsArray = Object.values(probs);

    const chartStatistics = Array(5).fill(0);
    for (let i = 0; i < trials; i++) {
      const eventOccurs = Random.getFromMultipleEvents({ probabilitiesArray: probsArray });
      chartStatistics[eventOccurs] += 1;
    }

    const chart: AccuracyChartData[] = chartStatistics.map((count, index) => ({
      name: `Prob ${index + 1}`,
      freq: count / trials,
      required: probsArray[index],
    }));

    setChartData(chart);
  };

  return (
    <Stack
      direction={'row'}
      spacing={4}
    >
      <AccuracyAnalyzeForm
        onSubmit={startTrials}
      />
      <AccuracyAnalyzeChart data={chartData} />
    </Stack>
  );
};
