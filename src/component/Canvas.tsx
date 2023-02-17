import { FC, useContext, useEffect, useRef } from "react";

import JournalContext from "../JournalContext";

interface Props {
  draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void;
}

const Canvas: FC<Props> = ({ draw }) => {
  const { width, height } = useContext(JournalContext);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    let context: CanvasRenderingContext2D | null;
    let frameCount = 0;
    let animationFrameId: number;

    const w = width - 1;
    const h = height - 5;
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";

    const render = () => {
      frameCount++;
      if (context) {
        draw(context, frameCount);
      }
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
    };
  }, [draw, width, height]);

  return <canvas ref={canvasRef} />;
};

export default Canvas;
