export const halt = {
  name: 'halt',
  opcode: 99,
  parameters: 0,
  continueExecution: false,
  execute: (memory, instructionPointer) => ({
    instructionPointer: instructionPointer + 1
  })
};
