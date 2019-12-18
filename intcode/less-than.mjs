import { getParameter } from './get-parameter.mjs';
import { setMemory } from './set-memory.mjs';

export const lessThan = {
  name: 'less than',
  opcode: 7,
  parameters: 3,
  continueExecution: true,
  execute: (
    memory,
    instructionPointer,
    [leftOperand, rightOperand, resultAddress],
    [leftOperandMode, rightOperandMode],
    getSystemInput,
    writeSystemOutput
  ) => ({
    instructionPointer: instructionPointer + 4,
    memory: setMemory(
      memory,
      resultAddress,
      +(
        getParameter(leftOperandMode, memory, leftOperand) <
        getParameter(rightOperandMode, memory, rightOperand)
      )
    )
  })
};
