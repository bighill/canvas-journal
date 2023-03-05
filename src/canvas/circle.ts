import { AnimElement } from "./AnimElement";

const circle = (ctx: CanvasRenderingContext2D, el: AnimElement): void => {
  ctx.fillStyle = el.colorBg;
  ctx.beginPath();
  ctx.arc(el.x1, el.y1, el.radius, 0, 2 * Math.PI);
  ctx.fill();
};

export default circle;
