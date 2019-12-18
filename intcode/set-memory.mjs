export const setMemory = (memory, index, value) => [
  ...memory.slice(0, index),
  value,
  ...memory.slice(index + 1)
];
