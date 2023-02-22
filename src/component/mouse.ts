interface MouseCoords {
  x: number;
  y: number;
}

export interface Mouse {
  down: MouseCoords;
  move: MouseCoords;
  up: MouseCoords;
}

const mouseCoordsDefault: MouseCoords = { x: 0, y: 0 };

const mouseDefault: Mouse = {
  down: { ...mouseCoordsDefault },
  move: { ...mouseCoordsDefault },
  up: { ...mouseCoordsDefault },
};

export default mouseDefault;
