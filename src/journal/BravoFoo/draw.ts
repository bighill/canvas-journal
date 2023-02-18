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
}

const data: Data = {
  gridNum: 12,
  delta: 0,
  deltaUp: true,
  variant: variant.STATIC,
  // variant: variant.SHAKE_X,
  // variant: variant.SHAKE_Y,
  // variant: variant.REVOLVE,
};

const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  ctx.clearRect(0, 0, w, h);

  const xSpace = Math.floor(w / data.gridNum);
  const ySpace = Math.floor(h / data.gridNum);

  // TODO
  // listen for click
  // toggle variant

  if (data.delta === 10) {
    data.deltaUp = false;
  }
  if (data.delta === 0) {
    data.deltaUp = true;
  }

  data.delta = data.deltaUp ? data.delta + 1 : data.delta - 1;

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
          // TODO
          break;
      }
    }
  }
};

export default draw;
