export const calcExpectation = (probs: number[]) => {
  return probs.reduce((previousValue, appearances, index) => {
    return previousValue + appearances * (index + 1);
  }, 0);
};

export const calcVariance = (probs: number[], expectation: number) => {
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

export const calcEmpChiSquared = ({ chartStatistics, trials, probs }: IEmpChiSquaredParams) => {
  return chartStatistics.reduce((previousValue, appearances, index) => {
    return previousValue + (appearances - trials * probs[index]) ** 2 / (trials * probs[index]);
  }, 0);
};

export const chiSquaredCriticalValues = [9.488, 13.277, 18.467];

export const chiSquaredTest = (chiSquaredParams: IEmpChiSquaredParams, alphaLevel = 0) => {
  return calcEmpChiSquared(chiSquaredParams) > chiSquaredCriticalValues[alphaLevel];
};
