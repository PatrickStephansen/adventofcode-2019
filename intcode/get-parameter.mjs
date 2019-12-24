export const getParameter = (mode, memory, parameterValue, relativeBase = 0) =>
  mode === 0
    ? memory[parameterValue] || 0
    : mode === 2
    ? memory[relativeBase + parameterValue] || 0
    : parameterValue;
