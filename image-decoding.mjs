import { writeFile } from 'fs';

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

export const flattenLayers = layers =>
  [...layers[0]].map((_, index) => layers.find(l => l[index] !== '2')[index]);

export const render = (image, width, height, fileName) => {
  const ppmContent = `P3
${width} ${height}
1
${image
  .map(
    (pixel, index) =>
      ` ${pixel} ${pixel} ${pixel}` +
      (index % width === width - 1
        ? `
`
        : ' ')
  )
  .join('')}`;
  writeFile(fileName, ppmContent, () => console.log(`file written: ${fileName}`));
};
