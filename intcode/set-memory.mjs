export const setMemory = (mode, memory, index, value, relativeBase) => {
  const trueIndex = mode === 2 ? index + relativeBase : index;
  return [...memory.slice(0, trueIndex), value, ...memory.slice(trueIndex + 1)];
};
