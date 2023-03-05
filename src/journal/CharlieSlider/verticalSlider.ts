import rectangle from "../../canvas/rectangle";
import { AnimElement, defaultAnimElement } from "../../canvas/AnimElement";
import isIntersection from "../../canvas/util/isIntersection";
import { Pointer } from "../../canvas/util/pointer";

interface Data {
  sliderY: number;
  isPointerStillDown: boolean;
  movingPointerY: number;
}

const data: Data = {
  sliderY: 0,
  isPointerStillDown: false,
  movingPointerY: 0,
};

const verticalSlider = (ctx: CanvasRenderingContext2D, pointer: Pointer) => {
  const isPointerMove = !!pointer.move.x && !!pointer.move.y;
  const isPointerDown = !!pointer.down.x && !!pointer.down.y;
  const isPointerUp = !!pointer.up.x && !!pointer.up.y;

  let isClickRect = false;
  let rect: AnimElement = defaultAnimElement;

  // NOTE because of the order of things,
  // this will get rendered based on data from the prev frame.
  rect = {
    ...rect,
    x2: 50,
    y1: data.sliderY,
    y2: data.sliderY + 50,
  };

  // on down
  if (isPointerDown) {
    data.isPointerStillDown = true;

    isClickRect = isIntersection({
      shape: "rectangle",
      pointer: pointer,
      target: rect,
    });
  }

  // on up
  if (isPointerUp) {
    data.isPointerStillDown = false;
    data.movingPointerY = 0;
  }

  // activate slider
  if (isClickRect) {
    data.movingPointerY = pointer.down.y;
  }

  // slider move
  if (data.isPointerStillDown && data.movingPointerY && isPointerMove) {
    const delta = pointer.move.y - data.movingPointerY;
    const newSliderY = data.sliderY + delta;
    data.sliderY = newSliderY;
    data.movingPointerY = pointer.move.y;
  }

  rectangle(ctx, rect);

  return;
};

export default verticalSlider;
