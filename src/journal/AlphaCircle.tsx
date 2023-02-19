import Canvas from "../component/Canvas";

interface Data {
  delta: number;
  deltaUp: boolean;
  speed: number;
}

const data: Data = {
  delta: 0,
  deltaUp: true,
  // speed: 1.0,
  // speed: 0.5,
  speed: 0.1,
};

const AlphaCircle = () => {
  const drawAnimCircle = (ctx: CanvasRenderingContext2D) => {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    // TODO put this delta logic somewhere shared

    if (data.delta >= 10) {
      data.deltaUp = false;
    }
    if (data.delta <= 0) {
      data.deltaUp = true;
    }

    data.delta = data.deltaUp
      ? data.delta + data.speed
      : data.delta - data.speed;

    // TODO listen for click to change speed

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "skyblue";
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 22 + data.delta * 3, 0, 2 * Math.PI);
    ctx.fill();
  };

  return <Canvas draw={drawAnimCircle} />;
};

export default AlphaCircle;
