import { TransformFunction } from '../types';

const cubeTransformation: TransformFunction = (line: string) => {
  const number = parseInt(line, 10);
  return Math.pow(number, 3);
};

export default cubeTransformation;
