export const getParameter = (mode, memory, parameterValue) =>
  mode === 0 ? memory[parameterValue] : parameterValue;

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
