import { AnimElement } from "./AnimElement";

const rectangle = (ctx: CanvasRenderingContext2D, el: AnimElement): void => {
  ctx.fillStyle = el.colorBg;
  ctx.fillRect(el.x1, el.y1, el.x2 - el.x1, el.y2 - el.y1);
};

export default rectangle;
