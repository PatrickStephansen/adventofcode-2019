export const interpretMap = mapString => mapString.split('\n').map(row => row.split(''));

export const toCoordinateList = asteroidMap =>
  asteroidMap.flatMap((row, rowIndex) =>
    row.flatMap((cell, columnIndex) => (cell === '.' ? [] : [{ x: columnIndex, y: rowIndex }]))
  );

const euclideanDistance = (p1, p2) => Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

export const toPolarCoordinates = (origin, point) => {
  const radians = Math.atan2(point.y - origin.y, point.x - origin.x) + Math.PI / 2;
  return {
    distance: euclideanDistance(point, origin),
    radians: radians < 0 ? radians + 2 * Math.PI : radians
  };
};

export const closeEnough = (f1, f2) => Math.abs(f2 - f1) <= Number.EPSILON;

export const countVisibleAsteroids = (origin, originIndex, asteroids) =>
  asteroids
    .filter((_, index) => index !== originIndex)
    .map(asteroid => toPolarCoordinates(origin, asteroid))
    .sort((a, b) => b.radians - a.radians)
    .reduce(
      (count, asteroid, index, otherAsteroids) =>
        closeEnough((otherAsteroids[index + 1] || { radians: 1000 }).radians, asteroid.radians)
          ? count
          : count + 1,
      0
    );
