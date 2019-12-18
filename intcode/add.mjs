import { getParameter } from "./get-parameter.mjs";
import { setMemory } from "./set-memory.mjs";

export const add = {
  name: 'add',
  opcode: 1,
  parameters: 3,
  continueExecution: true,
  execute: (
    memory,
    instructionPointer,
    [leftParameter, rightParameter, resultAddress],
    [leftParameterMode, rightParameterMode],
    getSystemInput,
    writeSystemOutput
  ) => ({
    instructionPointer: instructionPointer + 4,
    memory: setMemory(
      memory,
      resultAddress,
      getParameter(leftParameterMode, memory, leftParameter) +
        getParameter(rightParameterMode, memory, rightParameter)
    )
  })
};
