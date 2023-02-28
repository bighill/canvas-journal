interface PointerCoords {
  x: number;
  y: number;
}

export interface Pointer {
  down: PointerCoords;
  move: PointerCoords;
  up: PointerCoords;
}

const pointerCoordsDefault: PointerCoords = { x: 0, y: 0 };

const pointerDefault: Pointer = {
  down: { ...pointerCoordsDefault },
  move: { ...pointerCoordsDefault },
  up: { ...pointerCoordsDefault },
};

const getPointerEvent = (ev: MouseEvent | TouchEvent) => {
  if (ev && "touches" in ev) {
    ev.preventDefault();
    const touchMode = ev?.targetTouches;
    return touchMode[0];
  }

  if (ev && "screenX" in ev) {
    return ev;
  }

  return ev;
};

export const pointer = {
  default: pointerDefault,
  getEvent: getPointerEvent,
};
