/**
 * Signature for the transform API.
 *
 * Allows the user to pass in a csv and a transformer function to be applied to every row
 */
export interface Transform {
  csvPath: string;
  transformationFunction: TransformFunction;
  beforeReadHook?: () => void;
  afterReadHook?: () => void;
}

/** Transformer function used to modify the per-row input */
export type TransformFunction = (line: string) => any;
