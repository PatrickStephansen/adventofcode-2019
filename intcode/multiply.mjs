import { getParameter } from './get-parameter.mjs';
import { setMemory } from './set-memory.mjs';

export const multiply = {
  name: 'multiply',
  opcode: 2,
  parameters: 3,
  continueExecution: true,
  execute: (
    memory,
    instructionPointer,
    [leftParameter, rightParameter, resultAddress],
    [leftParameterMode, rightParameterMode, resultMode],
    getSystemInput,
    writeSystemOutput,
    relativeBase
  ) => ({
    instructionPointer: instructionPointer + 4,
    memory: setMemory(
      resultMode,
      memory,
      resultAddress,
      getParameter(leftParameterMode, memory, leftParameter, relativeBase) *
        getParameter(rightParameterMode, memory, rightParameter, relativeBase),
      relativeBase
    )
  })
};
