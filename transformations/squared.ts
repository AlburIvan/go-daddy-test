import { TransformFunction } from '../types';

const squareTransformation: TransformFunction = (line: string) => {
  const number = parseInt(line, 10);
  return Math.pow(number, 2);
};

export default squareTransformation;
