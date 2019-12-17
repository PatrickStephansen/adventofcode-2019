export const setMemory = (memory, index, value) => [
  ...memory.slice(0, index),
  value,
  ...memory.slice(index + 1)
];

export const parameterModes = {
  0: {
    code: 0,
    name: 'position'
  },
  1: {
    code: 1,
    name: 'immediate'
  }
};

export const instructions = {
  1: {
    name: 'add',
    opcode: 1,
    parameters: 3,
    continueExecution: true
  },
  2: {
    name: 'multiply',
    opcode: 2,
    parameters: 3,
    continueExecution: true
  },
  3: {
    name: 'save input',
    opcode: 3,
    parameters: 1,
    continueExecution: true
  },
  4: {
    name: 'output memory',
    opcode: 4,
    parameters: 1,
    continueExecution: true
  },
  99: {
    name: 'halt',
    opcode: 99,
    parameters: 0,
    continueExecution: false
  }
};
