import { getParameter } from './get-parameter.mjs';

export const print = {
  name: 'print',
  opcode: 4,
  parameters: 1,
  continueExecution: true,
  execute: (
    memory,
    instructionPointer,
    [outputParameter],
    [outputParameterMode],
    getSystemInput,
    writeSystemOutput
  ) => {
    writeSystemOutput(getParameter(outputParameterMode, memory, outputParameter));
    return { instructionPointer: instructionPointer + 2, memory };
  }
};
