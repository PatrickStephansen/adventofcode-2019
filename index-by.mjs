export const indexBy = (prop, arr) =>
  arr.reduce((indexed, current) => {
    indexed[current[prop]] = current;
    return indexed;
  }, {});
