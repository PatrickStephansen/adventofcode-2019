import { getParameter } from './get-parameter.mjs';
import { setMemory } from './set-memory.mjs';

export const equals = {
  name: 'equals',
  opcode: 8,
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
        getParameter(leftOperandMode, memory, leftOperand) ===
        getParameter(rightOperandMode, memory, rightOperand)
      )
    )
  })
};
