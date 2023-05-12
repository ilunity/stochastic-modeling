import React, { useState } from 'react';
import { AccuracyAnalyzeChart } from '../AccuracyAnalyzeChart';
import { AccuracyAnalyzeForm } from '../AccuracyAnalyzeForm';
import { Stack, Typography } from '@mui/material';
import { AccuracyAnalyzeFormInputs } from '../AccuracyAnalyzeForm/AccuracyAnalyzeForm.types';
import { AccuracyChartData } from '../AccuracyAnalyzeChart/AccuracyAnalyzeChart.types';
import { Random } from '../../utils';
import { round } from '../../utils/round';
import {
  calcAppearancesEmpChiSquared,
  calcAppearancesExpectation,
  calcAppearancesVariance,
  calcRelativeError,
  chiSquaredCriticalValues,
} from '../../utils/helpers';


export const AccuracyAnalyze: React.FC = () => {
  const [chartData, setChartData] = useState<AccuracyChartData[]>([]);
  const [empExpectation, setEmpExpectation] = useState<number>(-1);
  const [empVariance, setEmpVariance] = useState<number>(-1);
  const [relativeExpectationError, setRelativeExpectationError] = useState<number>(-1);
  const [relativeVarianceError, setRelativeVarianceError] = useState<number>(-1);
  const [chiSquared, setChiSquared] = useState<number>(-1);
  const [criticalValue, setCriticalValue] = useState<number>(-1);

  const startTrials = ({ trials, ...probs }: AccuracyAnalyzeFormInputs) => {
    const probsArray = Object.values(probs);

    const chartStatistics = Array(5).fill(0);
    for (let i = 0; i < trials; i++) {
      const eventOccurs = Random.getFromMultipleEvents({ probabilitiesArray: probsArray });
      chartStatistics[eventOccurs] += 1;
    }

    const relativeFrequencies = chartStatistics.map(count => count / trials);

    setEmpExpectation(calcAppearancesExpectation(relativeFrequencies));
    setEmpVariance(calcAppearancesVariance(relativeFrequencies, empExpectation));

    const mathExpectation = calcAppearancesExpectation(probsArray);
    const mathVariance = calcAppearancesVariance(probsArray, mathExpectation);

    setRelativeExpectationError(calcRelativeError(empExpectation, mathExpectation));
    setRelativeVarianceError(calcRelativeError(empVariance, mathVariance));

    setChiSquared(calcAppearancesEmpChiSquared({ chartStatistics, probs: probsArray, trials }));
    setCriticalValue(chiSquaredCriticalValues[0]);

    const chart: AccuracyChartData[] = chartStatistics.map((count, index) => ({
      name: `Prob ${index + 1}`,
      freq: count / trials,
      expectation: probsArray[index],
    }));

    setChartData(chart);
  };

  const chiSquaredTest = chiSquared > criticalValue;

  return (
    <Stack
      direction={'row'}
      spacing={4}
    >
      <AccuracyAnalyzeForm
        onSubmit={startTrials}
      />
      <AccuracyAnalyzeChart data={chartData} />
      {empExpectation &&
        <Stack>
          <Typography>
            Average: {round(empExpectation)} (error: {round(relativeExpectationError * 100)}%)
          </Typography>
          <Typography>
            Variance: {round(empVariance)} (error: {round(relativeVarianceError * 100)}%)
          </Typography>
          <Stack direction={'row'}>
            <Typography>
              Chi-squared: {round(chiSquared, 5)} {chiSquaredTest ? '>' : '<'} {criticalValue} is
            </Typography>
            <Typography sx={{ color: chiSquaredTest ? 'red' : 'green', ml: 1 }}>
              {chiSquaredTest ? 'true' : 'false'}
            </Typography>
          </Stack>
        </Stack>
      }
    </Stack>
  );
};
