interface Data {
  delta: number;
  deltaUp: boolean;
  speed: number;
}

const data: Data = {
  delta: 0,
  deltaUp: true,
  speed: 0.1,
};

const alphaCircle = (
  ctx: CanvasRenderingContext2D,
  clickEv: MouseEvent | null
) => {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  if (clickEv) {
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

  // TODO put this delta logic somewhere shared

  if (data.delta >= 10) {
    data.deltaUp = false;
  }
  if (data.delta <= 0) {
    data.deltaUp = true;
  }

  data.delta = data.deltaUp ? data.delta + data.speed : data.delta - data.speed;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "skyblue";
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, 22 + data.delta * 3, 0, 2 * Math.PI);
  ctx.fill();
};

export default alphaCircle;
