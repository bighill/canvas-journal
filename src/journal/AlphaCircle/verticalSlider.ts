import rectangle from "../../canvas/rectangle";
import { AnimElement } from "../../canvas/type";
import isIntersection from "../../canvas/util/isIntersection";
import { Pointer } from "../../canvas/util/pointer";

interface Data {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  sliderY: number;
  isPointerStillDown: boolean;
  isSliderActive: boolean;
}

const data: Data = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  sliderY: 0,
  isPointerStillDown: false,
  isSliderActive: false,
};

const verticalSlider = (ctx: CanvasRenderingContext2D, pointer: Pointer) => {
  const isPointerMove = !!pointer.move.x && !!pointer.move.y;
  const isPointerDown = !!pointer.down.x && !!pointer.down.y;
  const isPointerUp = !!pointer.up.x && !!pointer.up.y;

  let isClickRect = false;

  // do move
  if (data.isSliderActive && isPointerMove) {
    /*





    TODO improve dnd

    don't just set slider to equal pointer y
    find the amount pointer moved
    and add that delta to prev sliderY
    




    */
    data.sliderY = pointer.move.y;
  }

  // rect config
  const rect: AnimElement = {
    colorBg: "grey",
    x1: 0,
    y1: data.sliderY,
    x2: 50,
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
    data.isSliderActive = false;
  }

  // set slider active
  if (data.isPointerStillDown && isClickRect) {
    data.isSliderActive = true;
  }

  rectangle(ctx, rect);

  return;
};

export default verticalSlider;
