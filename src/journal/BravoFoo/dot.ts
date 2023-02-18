interface DataProps {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
}

const dot = (data: DataProps) => {
  data.ctx.fillStyle = "skyblue";
  data.ctx.beginPath();
  data.ctx.arc(data.x, data.y, 3, 0, 2 * Math.PI);
  data.ctx.fill();
  return null;
};

export default dot;
