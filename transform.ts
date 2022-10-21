import fs from 'fs';
import readline from 'readline';

import { Transform, TransformFunction } from './types';

export default function transform({
  csvPath,
  transformationFunction,
  afterReadHook,
  beforeReadHook,
}: Transform) {
  // Determine whether the input file is a URL or a machine file
  // TODO: implement transformUrl
  // const func = /(http|https):\/\//.test(csvPath) ? transformURL : transformFile
  const func = transformFile;

  func(csvPath, transformationFunction, beforeReadHook, afterReadHook);
}

// Applies transformation function to a file based CSV
function transformFile(
  csvPath,
  transformationFunction,
  beforeReadHook,
  afterReadHook
) {
  const transformedData = [];
  let startReadTime: [number, number] = [0, 0];

  const rawInput = fs.createReadStream(csvPath);

  const beforeHook = () => {
    console.log('[  BeforeReadHook::started  ]');

    if (typeof beforeReadHook !== 'function') return;

    beforeReadHook();

    // start timer right before it begins reading
    startReadTime = process.hrtime();
  };

  const afterHook = () => {
    console.log('\n[  AfterReadHook::started  ]');
    console.log('transformed data =', transformedData);

    // ends the timer right after it finishes / before any other operation
    const deltaReadTime = process.hrtime(startReadTime);

    console.log(
      '\n\nTime it took to process file -> %d (seconds)',
      (deltaReadTime.at(0) + deltaReadTime.at(1)) / 1000000000.0
    );

    if (typeof afterReadHook !== 'function') return;

    // we can pass both the final result AND|OR the process time as params to the end hook if needed be
    afterReadHook();
  };

  // Set hook listeners on brefore-start / after-end events
  rawInput.setEncoding('utf8').on('ready', beforeHook).on('close', afterHook);

  // read line-by-line and apply transformer function
  const lineReader = readline.createInterface({
    input: rawInput,
  });

  lineReader.on('line', function (line: string) {
    if (typeof transformationFunction !== 'function') return line;

    const modifiedChunk = transformationFunction(line);
    transformedData.push(modifiedChunk);
  });
}
