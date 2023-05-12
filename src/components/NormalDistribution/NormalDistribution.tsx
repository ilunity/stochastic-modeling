import React, { useState } from 'react';
import { Random } from '../../utils';
import { calcAverage, calcRelativeError, calcVariance, defineIntervals } from '../../utils/helpers';
import { Stack, Typography } from '@mui/material';
import { round } from '../../utils/round';
import { NormalDistributionInputs } from '../NormalDistributionForm/NormalDistributionForm.types';
import { NormalDistributionChartData } from '../NormalDistributionChart/NormalDistributionChart.types';
import { NormalDistributionForm } from '../NormalDistributionForm';
import { NormalDistributionChart } from '../NormalDistributionChart';

export const NormalDistribution: React.FC = () => {
  const [chartData, setChartData] = useState<NormalDistributionChartData[]>([]);
  const [average, setAverage] = useState<number>(-1);
  const [variance, setVariance] = useState<number>(-1);
  const [relativeExpectationError, setRelativeExpectationError] = useState<number>(-1);
  const [relativeVarianceError, setRelativeVarianceError] = useState<number>(-1);

  const startTrials = ({ variance: givenVariance, mean: givenMean, sampleSize }: NormalDistributionInputs) => {

    const nums = [];
    for (let i = 0; i < sampleSize; i++) {
      const num = Random.normalDistribution(givenMean, givenVariance);
      nums.push(num);
    }
    const { stats: intervalStatistics, intervalNames } = defineIntervals(nums);

    setAverage(calcAverage(nums));
    setVariance(calcVariance(nums, average));

    const mathExpectation = givenMean;
    const mathVariance = givenVariance;

    setRelativeExpectationError(calcRelativeError(average, mathExpectation));
    setRelativeVarianceError(calcRelativeError(variance, mathVariance));

    const chart: NormalDistributionChartData[] = intervalStatistics.map((count, index) => ({
      name: intervalNames[index],
      frequency: round(count / sampleSize),
    }));

    setChartData(chart);
  };

  return (
    <Stack
      direction={'row'}
      spacing={4}
    >
      <NormalDistributionForm
        onSubmit={startTrials}
      />
      <NormalDistributionChart data={chartData} />
      {average !== -1 &&
        <Stack>
          <Typography>
            Average: {round(average)} (error: {round(relativeExpectationError * 100)}%)
          </Typography>
          <Typography>
            Variance: {round(variance)} (error: {round(relativeVarianceError * 100)}%)
          </Typography>
        </Stack>
      }
    </Stack>
  );
};
