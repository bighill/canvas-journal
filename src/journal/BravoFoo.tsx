import Canvas from "../component/Canvas";

const BravoFoo = () => {
  const drawAnimCircle = (
    ctx: CanvasRenderingContext2D,
    frameCount: number
  ) => {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "skyblue";
    ctx.beginPath();
    ctx.arc(
      w / 2,
      h / 2,
      20 * Math.sin(frameCount * 0.05) ** 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
  };

  return <Canvas draw={drawAnimCircle} />;
};

export default BravoFoo;
