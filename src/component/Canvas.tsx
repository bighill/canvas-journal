import React, { FC, useEffect, useRef } from "react";

interface Props {
  draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void;
}

const Canvas: FC<Props> = ({ draw }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    let context: CanvasRenderingContext2D | null;
    let frameCount = 0;
    let animationFrameId: number;

    const render = () => {
      frameCount++;
      if (context) {
        draw(context, frameCount);
      }
      animationFrameId = window.requestAnimationFrame(render);
    };

    if (canvas) {
      context = canvas.getContext("2d");
      if (context) {
        render();
      }
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <canvas ref={canvasRef} />;
};

export default Canvas;
