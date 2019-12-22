import {
  add,
  multiply,
  readInput,
  print,
  jumpIfFalse,
  jumpIfTrue,
  lessThan,
  equals,
  halt,
  runProgram
} from './intcode/index.mjs';
import { indexBy } from './index-by.mjs';
import { input as thrusterProgram } from './7-input.mjs';
import { probe } from './probe.mjs';
import { getPermutations } from './permutations.mjs';

const instructionSet = [
  add,
  multiply,
  readInput,
  print,
  jumpIfFalse,
  jumpIfTrue,
  lessThan,
  equals,
  halt
];
const instructionDefinitions = indexBy('opcode', instructionSet);

const phasePermutations = getPermutations([0, 1, 2, 3, 4]);
(async () => {
  const thrustOutputs = phasePermutations.map(async phaseSettings => {
    let thrust = 0;
    const setThrust = value => (thrust = value);
    for (const phase of phaseSettings) {
      let phaseProvided = false;
      const provideInput = () => {
        if (phaseProvided) return thrust;
        phaseProvided = true;
        return phase;
      };

      await runProgram({
        memory: thrusterProgram,
        instructionDefinitions,
        getSystemInput: provideInput,
        writeSystemOutput: setThrust
      });
    }
    return thrust;
  });
  probe('max thrust', Math.max(...(await Promise.all(thrustOutputs))));
})();
