import { Pointer } from "../../canvas/util/pointer";
import dot from "./dot";

const variant: { [x: string]: string } = {
  STATIC: "static",
  SHAKE_X: "shake_x",
  SHAKE_Y: "shake_y",
  REVOLVE: "revolve",
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

const bravoDots = (ctx: CanvasRenderingContext2D, pointer: Pointer) => {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const xSpace = Math.floor(w / data.gridNum);
  const ySpace = Math.floor(h / data.gridNum);

  const isClick = pointer.down.x || pointer.down.y;

  isClick && _handleClick(data);
  _setAnimationDirection(data);
  _setAnimation(data);

  ctx.clearRect(0, 0, w, h);

  // TODO use the circle component (when ready) to replace dot()
  // TODO dnd-able dot that affects nearby dots
  for (let x = 1; x < data.gridNum; x++) {
    for (let y = 1; y < data.gridNum; y++) {
      switch (data.variant) {
        case variant.STATIC:
        default:
          dot({ ctx, x: x * xSpace, y: y * ySpace });
          break;
        case variant.SHAKE_X:
          dot({ ctx, x: x * xSpace + data.delta, y: y * ySpace });
          break;
        case variant.SHAKE_Y:
          dot({ ctx, x: x * xSpace, y: y * ySpace + data.delta });
          break;
        case variant.REVOLVE:
          // TODO revolving dots
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
