import { getParameter } from './get-parameter.mjs';

export const jumpIfFalse = {
  name: 'jump if false',
  opcode: 6,
  parameters: 2,
  continueExecution: true,
  execute: (
    memory,
    instructionPointer,
    [conditionParameter, jumpAddress],
    [conditionParameterMode, jumpAddressMode],
    getSystemInput,
    writeSystemOutput,
    relativeBase
  ) => ({
    instructionPointer: !getParameter(conditionParameterMode, memory, conditionParameter, relativeBase)
      ? getParameter(jumpAddressMode, memory, jumpAddress, relativeBase)
      : instructionPointer + 3
  })
};
