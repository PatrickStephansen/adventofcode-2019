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
    writeSystemOutput
  ) => ({
    memory,
    instructionPointer: !getParameter(conditionParameterMode, memory, conditionParameter)
      ? getParameter(jumpAddressMode, memory, jumpAddress)
      : instructionPointer + 3
  })
};
