export const parseInput = s =>
  s.split('\n').map(o => {
    const [orbited, orbiter] = o.split(')');
    return { orbited, orbiter };
  });

export const getUniqueCelestialBodies = orbitRelations => [
  ...new Set([...orbitRelations.map(o => o.orbited), ...orbitRelations.map(o => o.orbiter)])
];

export const getCentresOfMass = (uniqueCelestialBodies, orbitalRelations) =>
  uniqueCelestialBodies.filter(body => orbitalRelations.every(o => o.orbiter !== body));

const toTree = relations => root => {
  const leaves = relations.filter(r => r.orbited === root);
  return {
    body: root,
    orbitedBy: !leaves.length ? [] : leaves.map(leaf => toTree(relations)(leaf.orbiter))
  };
};

export const toTrees = (centresOfMass, relations) => centresOfMass.map(toTree(relations));
