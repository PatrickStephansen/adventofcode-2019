import { input } from './8-input.mjs';

// this is a mistake - number of layers is unknown
const splitLayers = (width, height, input) => [
  input.slice(0, height * width),
  input.slice(height * width, height * width * 2),
  input.slice(height * width * 2, height * width * 3)
];

const getValuesPerLayer = layers =>
  layers.map(l => [...l].reduce((vpl, value) => ({ ...vpl, [value]: (vpl[value] || 0) + 1 }), {}));

const integrityCheck = input => {
  const valuesPerLayer = getValuesPerLayer(splitLayers(25, 6, input));
  const minZeros = Math.min(...valuesPerLayer.map(l => l[0]));
  const layersWithFewestZeros = valuesPerLayer.filter(l => l[0] === minZeros);
  return layersWithFewestZeros.map(l => l[1] * l[2]);
};

console.log(integrityCheck(input));
