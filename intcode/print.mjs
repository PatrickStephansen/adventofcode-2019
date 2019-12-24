import { getParameter } from './get-parameter.mjs';

export const print = {
  name: 'print',
  opcode: 4,
  parameters: 1,
  continueExecution: true,
  execute: async (
    memory,
    instructionPointer,
    [outputParameter],
    [outputParameterMode],
    getSystemInput,
    writeSystemOutput,
    relativeBase
  ) => {
    await Promise.resolve(
      writeSystemOutput(getParameter(outputParameterMode, memory, outputParameter, relativeBase))
    );
    return { instructionPointer: instructionPointer + 2 };
  }
};
