import { instructions, parameterModes as knownParameterModes, setMemory } from './intcode.mjs';

export const getParameter = (mode, memory, parameterValue) =>
  mode.code === 0 ? memory[parameterValue] : parameterValue;

export const advanceByParametersAndOpcode = (instructionPointer, instruction) =>
  instructionPointer + instruction.parameters + 1;

export const extractOpcode = instructionCode => instructionCode % 100;

// pad to taste
// the most parameters we need so far is 3
export const extractParameterModes = instructionCode =>
  [...('000' + Math.floor(instructionCode / 100))].reverse().map(x => +x);

export const runTestDiagnostics = machineState => {
  const {
    getInput = () => 1,
    writeOutput = console.log,
    getParam = getParameter,
    advanceInstructionPointer = advanceByParametersAndOpcode,
    instructionPointer = 0,
    knownInstructions = instructions,
    knownParamModes = knownParameterModes,
    memory
  } = machineState;
  const instructionCode = memory[instructionPointer];
  const opcode = extractOpcode(instructionCode);
  const parameterModes = extractParameterModes(instructionCode);
  const instruction = knownInstructions[opcode];
  const parametersCount = instruction.parameters;
  const parameters = memory.slice(instructionPointer + 1, instructionPointer + 1 + parametersCount);
  if (!instruction.continueExecution) {
    return memory;
  }
  const nextInstructionPointer = advanceInstructionPointer(instructionPointer, instruction);

  if (opcode === 1 || opcode === 2) {
    const operation = opcode === 1 ? (a, b) => a + b : (a, b) => a * b;
    const [leftParameterMode, rightParameterMode] = parameterModes;
    const [leftParameter, rightParameter, resultParameter] = parameters;
    const leftOperand = getParam(knownParamModes[leftParameterMode], memory, leftParameter);
    const rightOperand = getParam(knownParamModes[rightParameterMode], memory, rightParameter);
    const nextMemory = setMemory(memory, resultParameter, operation(leftOperand, rightOperand));
    return runTestDiagnostics({
      ...machineState,
      instructionPointer: nextInstructionPointer,
      memory: nextMemory
    });
  }
  if (opcode === 3) {
    const [saveAddress] = parameters;
    return runTestDiagnostics({
      ...machineState,
      instructionPointer: nextInstructionPointer,
      memory: setMemory(memory, saveAddress, getInput())
    });
  }
  if (opcode === 4) {
    const [printParam] = parameters;
    const [printParamMode] = parameterModes;
    writeOutput(getParam(knownParamModes[printParamMode], memory, printParam));
    return runTestDiagnostics({
      ...machineState,
      instructionPointer: nextInstructionPointer
    });
  }
};
