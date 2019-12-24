export const interpretMap = mapString => mapString.split('\n').map(row => row.split(''));

export const toCoordinateList = asteroidMap =>
  asteroidMap.flatMap((row, rowIndex) =>
    row.flatMap((cell, columnIndex) => (cell === '.' ? [] : [{ x: columnIndex, y: rowIndex }]))
  );

const euclideanDistance = (p1, p2) => Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

export const toPolarCoordinates = (origin, point) => ({
  distance: euclideanDistance(point, origin),
  radians: -Math.atan2(point.y - origin.y, point.x - origin.x)
});

export const closeEnough = (f1, f2) => Math.abs(f2 - f1) <= Number.EPSILON;
