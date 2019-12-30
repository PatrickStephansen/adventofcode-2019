import { runProgram } from './intcode/index.mjs';

export const rotateDirection = (currentDirection, rotationDirection, directions) =>
  directions[
    (directions.findIndex(d => d === currentDirection) +
      (rotationDirection === 1 ? 1 : -1) +
      directions.length) %
      directions.length
  ];
export const moveInDirection = ({ x, y }, direction) => ({
  x: x + (direction === 'left' ? -1 : direction === 'right' ? 1 : 0),
  y: y + (direction === 'down' ? -1 : direction === 'up' ? 1 : 0)
});

export const moveRobot = (directions, moveCommand, { direction, coordinates }) => {
  const newDirection = rotateDirection(direction, moveCommand, directions);
  return {
    direction: newDirection,
    coordinates: moveInDirection(coordinates, newDirection)
  };
};

export const paintPanel = (paintedPanels, coordinates, colour) => {
  const alreadyPaintedPanelIndex = paintedPanels.findIndex(
    ({ coordinates: coords }) => coords.x === coordinates.x && coords.y === coordinates.y
  );
  if (alreadyPaintedPanelIndex !== -1) {
    return [
      ...paintedPanels.slice(0, alreadyPaintedPanelIndex),
      { coordinates, colour },
      ...paintedPanels.slice(alreadyPaintedPanelIndex + 1)
    ];
  }
  return [...paintedPanels, { coordinates, colour }];
};

export const getPanelColour = (paintedPanels, coordinates, pallette) =>
  (
    paintedPanels.find(
      ({ coordinates: coords }) => coords.x === coordinates.x && coords.y === coordinates.y
    ) || { colour: pallette[0] }
  ).colour;

export const runPainterProgram = async (
  directions,
  pallette,
  robotLocation,
  paintedPanels,
  nextInstructionIsDirection,
  instructionSet,
  painterProgram
) => {
  const getCurrentPanelColour = () =>
    pallette.findIndex(c => c === getPanelColour(paintedPanels, robotLocation, pallette));
  const executeRobotCommand = command => {
    if (nextInstructionIsDirection) {
      robotLocation = moveRobot(directions, command, robotLocation);
    } else {
      paintedPanels = paintPanel(paintedPanels, robotLocation.coordinates, pallette[command]);
    }
    nextInstructionIsDirection = !nextInstructionIsDirection;
  };

  await runProgram({
    getSystemInput: getCurrentPanelColour,
    writeSystemOutput: executeRobotCommand,
    memory: painterProgram,
    instructionDefinitions: instructionSet
  });
  return { paintedPanels, robotLocation };
};
