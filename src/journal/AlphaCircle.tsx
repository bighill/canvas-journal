import Canvas from "../component/Canvas";

const AlphaCircle = () => {
  const drawAnimCircle = (
    ctx: CanvasRenderingContext2D,
    frameCount: number
  ) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  return <Canvas draw={drawAnimCircle} />;
};

export default AlphaCircle;
