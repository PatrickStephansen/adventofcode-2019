const extractOpcode = instructionCode => instructionCode % 100;

// pad to taste
// the most parameters we need so far is 3
const extractParameterModes = instructionCode =>
  [...('000' + Math.floor(instructionCode / 100))].reverse().map(x => +x);

export const runProgram = async machineState => {
  const {
    getSystemInput,
    writeSystemOutput,
    instructionPointer = 0,
    memory,
    instructionDefinitions
  } = machineState;
  const instructionCode = memory[instructionPointer];
  const opcode = extractOpcode(instructionCode);
  const parameterModes = extractParameterModes(instructionCode);
  const instruction = instructionDefinitions[opcode];
  const parametersCount = instruction.parameters;
  const parameters = memory.slice(instructionPointer + 1, instructionPointer + 1 + parametersCount);
  if (!instruction.continueExecution) {
    return Promise.resolve(memory);
  }
  return await runProgram({
    ...machineState,
    ...(await Promise.resolve(
      instruction.execute(
        memory,
        instructionPointer,
        parameters,
        parameterModes,
        getSystemInput,
        writeSystemOutput
      )
    ))
  });
};
