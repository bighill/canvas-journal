import { AnimElement } from "./type";

const rectangle = (ctx: CanvasRenderingContext2D, el: AnimElement): void => {
  if (
    el.colorBg === undefined ||
    el.x1 === undefined ||
    el.y1 === undefined ||
    el.x2 === undefined ||
    el.y2 === undefined
  ) {
    return;
  }

  ctx.fillStyle = el.colorBg;
  ctx.fillRect(el.x1, el.y1, el.x2 - el.x1, el.y2 - el.y1);
};

export default rectangle;
