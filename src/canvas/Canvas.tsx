import { FC, RefObject, useEffect, useRef } from "react";

import { Pointer, pointer } from "./util/pointer";

interface Props {
  draw: (ctx: CanvasRenderingContext2D, pointer: Pointer) => void;
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
    let pointerData = { ...pointer.default };

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const ev = pointer.getEvent(event);
      pointerData.down = { x: ev.clientX, y: ev.clientY };
    };
    const onPointerMove = (event: MouseEvent | TouchEvent) => {
      const ev = pointer.getEvent(event);
      pointerData.move = { x: ev.clientX, y: ev.clientY };
    };
    const onPointerUp = (event: MouseEvent | TouchEvent) => {
      const ev = pointer.getEvent(event);
      pointerData.up = { x: ev.clientX, y: ev.clientY };
    };

    canvas.addEventListener("mousedown", onPointerDown);
    canvas.addEventListener("touchstart", onPointerDown);
    canvas.addEventListener("mousemove", onPointerMove);
    canvas.addEventListener("touchmove", onPointerMove);
    canvas.addEventListener("mouseup", onPointerUp);
    canvas.addEventListener("touchend", onPointerUp);

    const w = width - 1;
    const h = height - 5;
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";

    const render = () => {
      if (context) {
        draw(context, pointerData);
      }
      pointerData = { ...pointer.default };
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
      canvas.removeEventListener("mousedown", onPointerDown);
      canvas.removeEventListener("mousemove", onPointerMove);
      canvas.removeEventListener("mouseup", onPointerUp);
    };
  }, [draw, width, height]);

  return <canvas ref={canvasRef} />;
};

export default Canvas;
