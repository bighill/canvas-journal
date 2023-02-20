import { FC, RefObject, useEffect, useRef } from "react";

interface Props {
  draw: (ctx: CanvasRenderingContext2D, clickEv: MouseEvent | null) => void;
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
    let clickEv: MouseEvent | null = null;

    const handleClick = (ev: MouseEvent) => (clickEv = ev);

    canvas.addEventListener("click", handleClick);

    const w = width - 1;
    const h = height - 5;
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";

    const render = () => {
      if (context) {
        draw(context, clickEv);
      }
      clickEv = null;
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
      canvas.removeEventListener("click", handleClick);
    };
  }, [draw, width, height]);

  return <canvas ref={canvasRef} />;
};

export default Canvas;
