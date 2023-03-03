import { Pointer } from "../../canvas/util/pointer";
import verticalSlider from "./verticalSlider";

// const variant: { [x: string]: string } = {
//   STATIC: "static",
//   SHAKE_X: "shake_x",
//   SHAKE_Y: "shake_y",
//   REVOLVE: "revolve",
// };

// interface Data {
//   gridNum: number;
//   delta: number;
//   deltaUp: boolean;
//   variant: string;
//   speed: number;
// }

// const data: Data = {
//   gridNum: 12,
//   delta: 0,
//   deltaUp: true,
//   variant: variant.STATIC,
//   speed: 1.0,
// };

const charlieSlider = (ctx: CanvasRenderingContext2D, pointer: Pointer) => {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  ctx.clearRect(0, 0, w, h);

  // TODO make this return a 0-1 value
  verticalSlider(ctx, pointer);

  // TODO horizontal slider
  // TODO some type of visual feedback based on slider state

  // TODO make sliders reuse-able and accept fn props to draw the "thumb" & "track"
};

export default charlieSlider;
