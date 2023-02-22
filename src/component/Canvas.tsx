import { FC, RefObject, useEffect, useRef } from "react";

import mouseDefault, { Mouse } from "./mouse";

interface Props {
  draw: (ctx: CanvasRenderingContext2D, mouse: Mouse) => void;
  mainRef?: RefObject<HTMLDivElement>;
  width: number;
  height: number;
}

const Canvas: FC<Props> = ({ draw, width, height }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    let context: CanvasRenderingContext2D | null;
    let animationFrameId: number;
    let mouse = { ...mouseDefault };

    const onMouseDown = (ev: MouseEvent) => (mouse.down = { x: ev.x, y: ev.y });
    const onMouseMove = (ev: MouseEvent) => (mouse.move = { x: ev.x, y: ev.y });
    const onMouseUp = (ev: MouseEvent) => (mouse.up = { x: ev.x, y: ev.y });

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);

    const w = width - 1;
    const h = height - 5;
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";

    const render = () => {
      if (context) {
        draw(context, mouse);
      }
      mouse = { ...mouseDefault };
      animationFrameId = window.requestAnimationFrame(render);
    };

    if (canvas && canvas.getContext) {
      context = canvas.getContext("2d");
      if (context) {
        render();
      }
    } else {
      alert("This web browser is not supported.");
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
    };
  }, [draw, width, height]);

  return <canvas ref={canvasRef} />;
};

export default Canvas;
