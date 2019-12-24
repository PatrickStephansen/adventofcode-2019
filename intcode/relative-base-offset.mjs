import { getParameter } from './get-parameter.mjs';

export const relativeBaseOffset = {
  name: 'relative base offset',
  opcode: 9,
  parameters: 1,
  continueExecution: true,
  execute: (
    memory,
    instructionPointer,
    [offset],
    [offsetMode],
    getSystemInput,
    writeSystemOutput,
    relativeBase
  ) => ({
    relativeBase: relativeBase + getParameter(offsetMode, memory, offset, relativeBase),
    instructionPointer: instructionPointer + 2
  })
};
