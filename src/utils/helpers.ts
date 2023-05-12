import { round } from './round';

export const calcAppearancesExpectation = (probs: number[]) => {
  return probs.reduce((previousValue, appearances, index) => {
    return previousValue + appearances * (index + 1);
  }, 0);
};

export const calcAppearancesVariance = (probs: number[], expectation: number) => {
  return Math.abs(
    probs.reduce((previousValue, appearances, index) => {
      return previousValue + appearances * (index + 1) ** 2;
    }, 0) - expectation ** 2,
  );
};

export const calcAbsoluteError = (empNumber: number, mathNumber: number) => Math.abs(empNumber - mathNumber);

export const calcRelativeError = (empNumber: number, mathNumber: number) => {
  return calcAbsoluteError(empNumber, mathNumber) / mathNumber;
};

interface IEmpChiSquaredParams {
  chartStatistics: number[];
  trials: number;
  probs: number[];
}

export const calcAppearancesEmpChiSquared = ({ chartStatistics, trials, probs }: IEmpChiSquaredParams) => {
  return chartStatistics.reduce((previousValue, appearances, index) => {
    return previousValue + (appearances - trials * probs[index]) ** 2 / (trials * probs[index]);
  }, 0);
};

export const chiSquaredCriticalValues = [9.488, 13.277, 18.467];

export const chiSquaredTest = (chiSquaredParams: IEmpChiSquaredParams, alphaLevel = 0) => {
  return calcAppearancesEmpChiSquared(chiSquaredParams) > chiSquaredCriticalValues[alphaLevel];
};

interface DefineIntervalsReturn {
  stats: number[];
  intervalNames: string[];
}

const INTERVALS_COUNT = 13;
export const defineIntervals = (nums: number[]): DefineIntervalsReturn => {
  const max = Math.max(...nums);
  const min = Math.min(...nums);

  const size = max - min;
  const intervalSize = round(size / INTERVALS_COUNT);
  const stats = Array(INTERVALS_COUNT).fill(0);

  for (let num of nums) {
    let intervalIndex = -1;
    while (num >= min) {
      num -= intervalSize;
      intervalIndex++;
    }

    intervalIndex = intervalIndex >= INTERVALS_COUNT ? INTERVALS_COUNT - 1 : intervalIndex;
    stats[intervalIndex]++;
  }

  const intervalNames = [];
  for (let i = 0; i < INTERVALS_COUNT; i++) {
    intervalNames.push(`
      (${round(min + intervalSize * i)}; ${round(min + intervalSize * (i + 1))}]
    `);
  }

  return { stats, intervalNames };
};

export const calcSum = (nums: number[]) => {
  return nums.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
};

export const calcAverage = (nums: number[]) => {
  return calcSum(nums) / nums.length;
};

export const calcVariance = (nums: number[], average: number) => {
  const squares = nums.map(value => value ** 2);
  const squaresSum = calcSum(squares);
  return Math.abs(squaresSum / nums.length - average ** 2);
};
