export const setMemory = (mode, memory, index, value, relativeBase) => {
  const trueIndex = mode === 2 ? index + relativeBase : index;
  if (trueIndex > memory.length) {
    const newMemory = [...memory];
    newMemory[trueIndex] = value;
    return newMemory;
  }
  return [...memory.slice(0, trueIndex), value, ...memory.slice(trueIndex + 1)];
};
