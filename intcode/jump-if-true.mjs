import { getParameter } from './get-parameter.mjs';

export const jumpIfTrue = {
  name: 'jump if true',
  opcode: 5,
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
    instructionPointer: getParameter(conditionParameterMode, memory, conditionParameter)
      ? getParameter(jumpAddressMode, memory, jumpAddress)
      : instructionPointer + 3
  })
};
