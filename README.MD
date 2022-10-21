# GoDaddy Take Home Assignment

## Functional Requirements

Create a node project that does the following:

[X] Takes a CSV file destination as an input. The input can be a URL or file on
machine.
[X] Allows the consumer to pass a transformer function that will run for each row of
the CSV.

## Optional Goals:

[X] Add ability to run a hook before the file is read.
[X] Add ability to run a hook after the file is processed.
[X] Capture the time it takes for the file to get processed.

## How to run the project?

`npm start` or `npm run start:file` to read the example CSV named `numbers.csv`

## Additional Notes:

### Pros and Cons (if any) of the chosen approach.

#### Pros

- Flexible approach to passing transformer function
- Complete control of the transformer function's return value
- Memory aware by not dumping the entire file into memory (reading line by line)
- Hooks before/after file read

#### Cons

- This approach doesn't not take into account headers in the CSV format (TODO)
- Approach only work on `file://` paths not URLs (TODO)

### TODO

[] Implement tests to make sure the transform function keeps its core behavior
[] Implement URL support
