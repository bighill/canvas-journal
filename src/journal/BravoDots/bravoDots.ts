import { AnimElement, defaultAnimElement } from "../../canvas/AnimElement";
import circle from "../../canvas/circle";
import { Pointer } from "../../canvas/util/pointer";

const variant: { [x: string]: string } = {
  STATIC: "static",
  SHAKE_X: "shake_x",
  SHAKE_Y: "shake_y",
};

interface Data {
  gridNum: number;
  delta: number;
  deltaUp: boolean;
  variant: string;
  speed: number;
}

const data: Data = {
  gridNum: 12,
  delta: 0,
  deltaUp: true,
  variant: variant.STATIC,
  speed: 1.0,
};

const defaultDotEl: AnimElement = {
  ...defaultAnimElement,
  colorBg: "skyblue",
  radius: 3,
};

const bravoDots = (ctx: CanvasRenderingContext2D, pointer: Pointer) => {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const xSpace = Math.floor(w / data.gridNum);
  const ySpace = Math.floor(h / data.gridNum);
  let el: AnimElement;

  const isClick = pointer.down.x || pointer.down.y;

  isClick && _handleClick(data);
  _setAnimationDirection(data);
  _setAnimation(data);

  ctx.clearRect(0, 0, w, h);

  // TODO dnd-able dot that affects nearby dots
  for (let x = 1; x < data.gridNum; x++) {
    for (let y = 1; y < data.gridNum; y++) {
      switch (data.variant) {
        case variant.STATIC:
        default:
          el = {
            ...defaultDotEl,
            x1: x * xSpace,
            y1: y * ySpace,
          };
          circle(ctx, el);
          break;
        case variant.SHAKE_X:
          el = {
            ...defaultDotEl,
            x1: x * xSpace + data.delta,
            y1: y * ySpace,
          };
          circle(ctx, el);
          break;
        case variant.SHAKE_Y:
          el = {
            ...defaultDotEl,
            x1: x * xSpace,
            y1: y * ySpace + data.delta,
          };
          circle(ctx, el);
          break;
      }
    }
  }
};

export default bravoDots;

function _handleClick(data: Data): void {
  switch (data.variant) {
    case variant.STATIC:
    default:
      data.variant = variant.SHAKE_X;
      break;
    case variant.SHAKE_X:
      data.variant = variant.SHAKE_Y;
      break;
    case variant.SHAKE_Y:
      data.variant = variant.STATIC;
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
