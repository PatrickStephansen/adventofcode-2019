const compute = (
  state,
  programCounter = 0,
  [opcode, leftIndex, rightIndex, resultIndex] = state.slice(programCounter),
  operation = (a, b) => (opcode === 1 ? a + b : a * b),
  setValue = (s, index, value) => [...s.slice(0, index), value, ...s.slice(index + 1)]
) =>
  opcode === 99
    ? state
    : compute(
        setValue(state, resultIndex, operation(state[leftIndex], state[rightIndex])),
        programCounter + 4
      );

// manually preprocess input state by setting position 1 to 12 and 2 to 2 before beginning
