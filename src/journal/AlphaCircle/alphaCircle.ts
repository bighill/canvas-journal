import rectangle from "../../canvas/rectangle";
import { AnimElement } from "../../canvas/type";
import isIntersection from "../../canvas/util/isIntersection";
import { Mouse } from "../../canvas/util/mouse";

interface Data {
  delta: number;
  deltaUp: boolean;
  isMouseDown: boolean;
  isSliderActive: boolean;
  speed: number;
}

let data: Data = {
  delta: 0,
  deltaUp: true,
  isMouseDown: false,
  isSliderActive: false,
  speed: 0.1,
};

const alphaCircle = (ctx: CanvasRenderingContext2D, mouse: Mouse) => {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  if (!!mouse.down.x && !!mouse.down.y) {
    data.isMouseDown = true;
  }
  if (!!mouse.up.x && !!mouse.up.y) {
    data.isMouseDown = false;
    data.isSliderActive = false;
  }

  _setAnimationDirection(data);
  _setAnimation(data);

  ctx.clearRect(0, 0, w, h);

  // TODO new canvas component: circle w/prop type AnimElement
  ctx.fillStyle = "skyblue";
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, 22 + data.delta * 3, 0, 2 * Math.PI);
  ctx.fill();

  // TODO
  // - new function: slider
  // - process object data
  // - isIntersection
  let rect: AnimElement = { colorBg: "grey", x1: 0, y1: 0, x2: 50, y2: 50 };

  const isClickRect =
    data.isMouseDown &&
    isIntersection({
      shape: "rectangle",
      mouse: mouse,
      target: rect,
    });

  if (isClickRect) {
    data.isSliderActive = true;
  }

  if (data.isSliderActive) {
    rect = {
      ...rect,
      x1: mouse.move.x,
      y1: mouse.move.y,
      x2: mouse.move.x + 50,
      y2: mouse.move.y + 50,
    };
  }
  rectangle(ctx, rect);
};

export default alphaCircle;

// function _handleClick(data: Data): void {
//   switch (data.speed) {
//     case 0.1:
//     default:
//       data.speed = 0.5;
//       break;
//     case 0.5:
//       data.speed = 1.0;
//       break;
//     case 1.0:
//       data.speed = 0.1;
//       break;
//   }
// }

function _setAnimationDirection(data: Data): void {
  data.delta >= 10 && (data.deltaUp = false);
  data.delta <= 0 && (data.deltaUp = true);
}

function _setAnimation(data: Data): void {
  data.delta = data.deltaUp ? data.delta + data.speed : data.delta - data.speed;
}
