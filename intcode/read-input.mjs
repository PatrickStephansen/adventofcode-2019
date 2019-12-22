import { setMemory } from './set-memory.mjs';

export const readInput = {
  name: 'read input',
  opcode: 3,
  parameters: 1,
  continueExecution: true,
  execute: async (
    memory,
    instructionPointer,
    [saveAddress],
    [saveAddressMode],
    getSystemInput,
    writeSystemOutput
  ) => {
    return {
      instructionPointer: instructionPointer + 2,
      memory: setMemory(memory, saveAddress, await Promise.resolve(getSystemInput()))
    };
  }
};
