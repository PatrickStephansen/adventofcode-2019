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
    [leftOperandMode, rightOperandMode, resultMode],
    getSystemInput,
    writeSystemOutput,
    relativeBase
  ) => ({
    instructionPointer: instructionPointer + 4,
    memory: setMemory(
      resultMode,
      memory,
      resultAddress,
      +(
        getParameter(leftOperandMode, memory, leftOperand, relativeBase) <
        getParameter(rightOperandMode, memory, rightOperand, relativeBase)
      ),
      relativeBase
    )
  })
};
