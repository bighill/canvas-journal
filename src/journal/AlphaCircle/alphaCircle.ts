import { AnimElement, defaultAnimElement } from "../../canvas/AnimElement";
import circle from "../../canvas/circle";
import { Pointer } from "../../canvas/util/pointer";

interface Data {
  delta: number;
  deltaUp: boolean;
  speed: number;
}

let data: Data = {
  delta: 0,
  deltaUp: true,
  speed: 0.1,
};

const alphaCircle = (ctx: CanvasRenderingContext2D, pointer: Pointer) => {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const isClick = pointer.down.x || pointer.down.y;

  _setAnimationDirection(data);
  _setAnimation(data);

  // TODO control speed via dnd directly on the canvas
  isClick && _handleClick(data);

  ctx.clearRect(0, 0, w, h);

  const el: AnimElement = {
    ...defaultAnimElement,
    colorBg: "skyblue",
    x1: w / 2,
    y1: h / 2,
    radius: 22 + data.delta * 3,
  };

  circle(ctx, el);
};

export default alphaCircle;

function _handleClick(data: Data): void {
  switch (data.speed) {
    case 0.1:
    default:
      data.speed = 0.5;
      break;
    case 0.5:
      data.speed = 1.0;
      break;
    case 1.0:
      data.speed = 0.1;
      break;
  }
}

function _setAnimationDirection(data: Data): void {
  data.delta >= 10 && (data.deltaUp = false);
  data.delta <= 0 && (data.deltaUp = true);
}

function _setAnimation(data: Data): void {
  data.delta = data.deltaUp ? data.delta + data.speed : data.delta - data.speed;
}
