export const splitLayers = (width, height, input) =>
  input.length
    ? [input.slice(0, height * width), ...splitLayers(width, height, input.slice(height * width))]
    : [];

export const getValuesPerLayer = layers =>
  layers.map(l => [...l].reduce((vpl, value) => ({ ...vpl, [value]: (vpl[value] || 0) + 1 }), {}));

export const integrityCheck = input => {
  const valuesPerLayer = getValuesPerLayer(splitLayers(25, 6, input));
  const minZeros = Math.min(...valuesPerLayer.map(l => l[0]));
  const layersWithFewestZeros = valuesPerLayer.filter(l => l[0] === minZeros);
  return layersWithFewestZeros.map(l => l[1] * l[2]);
};
