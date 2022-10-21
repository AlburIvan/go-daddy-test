import transform from './transform';
import { squareTransformation } from './transformations';

// Users using the API
const beforeHook = () => console.log('We are going to read CSV');
const afterHook = () => console.log('Callback from CSV');

// read arguments, ignoring `node` and `script name` indexes
const [, , path] = process.argv;

transform({
  csvPath: path || './numbers.csv',
  transformationFunction: squareTransformation,
  beforeReadHook: beforeHook,
  afterReadHook: afterHook,
});
