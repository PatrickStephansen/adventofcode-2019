export const relativeBaseOffset = {
  name: 'relative base offset',
  opcode: 9,
  parameters: 1,
  continueExecution: true,
  execute: (
    memory,
    instructionPointer,
    [offset],
    [offsetMode],
    getSystemInput,
    writeSystemOutput,
    relativeBase
  ) => ({
    relativeBase: relativeBase + offset,
    instructionPointer: instructionPointer + 2
  })
};
