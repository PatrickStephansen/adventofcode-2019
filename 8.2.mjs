import { input } from './8-input.mjs';
import { render } from './image-decoding.mjs';
import { flattenLayers } from './image-decoding.mjs';
import { splitLayers } from './image-decoding.mjs';

render(flattenLayers(splitLayers(25, 6, input)), 25, 6, '8-out.ppm');
