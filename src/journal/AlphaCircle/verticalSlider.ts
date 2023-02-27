import rectangle from "../../canvas/rectangle";
import { AnimElement } from "../../canvas/type";
import isIntersection from "../../canvas/util/isIntersection";
import { Mouse } from "../../canvas/util/mouse";

interface Data {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  sliderY: number;
  isMouseStillDown: boolean;
  isSliderActive: boolean;
}

const data: Data = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  sliderY: 0,
  isMouseStillDown: false,
  isSliderActive: false,
};

const verticalSlider = (ctx: CanvasRenderingContext2D, mouse: Mouse) => {
  const isMouseMove = !!mouse.move.x && !!mouse.move.y;
  const isMouseDown = !!mouse.down.x && !!mouse.down.y;
  const isMouseUp = !!mouse.up.x && !!mouse.up.y;

  let isClickRect = false;

  // do move
  if (data.isSliderActive && isMouseMove) {
    /*





    TODO

    don't just set slider to equal mouse y
    find the amount mouse moved
    and add that delta to prev sliderY
    




    */
    data.sliderY = mouse.move.y;
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
  if (isMouseDown) {
    data.isMouseStillDown = true;

    isClickRect = isIntersection({
      shape: "rectangle",
      mouse: mouse,
      target: rect,
    });
  }

  // on up
  if (isMouseUp) {
    data.isMouseStillDown = false;
    data.isSliderActive = false;
  }

  // set slider active
  if (data.isMouseStillDown && isClickRect) {
    data.isSliderActive = true;
  }

  rectangle(ctx, rect);

  return;
};

export default verticalSlider;
