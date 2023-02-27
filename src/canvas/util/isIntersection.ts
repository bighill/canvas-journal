import { AnimElement } from "../type";
import { Mouse } from "./mouse";

export const shapes = {
  RECTANGLE: "rectangle",
};

interface Props {
  shape: string;
  mouse: Mouse;
  target: AnimElement;
}

const isIntersection = (p: Props): boolean => {
  switch (p.shape) {
    case shapes.RECTANGLE:
      return _rectangle(p);
    default:
      return false;
  }
};

export default isIntersection;

const _rectangle = (p: Props): boolean => {
  if (p.target.x2 === undefined) return false;
  if (p.target.y2 === undefined) return false;
  if (p.mouse.down.x < p.target.x1) return false;
  if (p.mouse.down.x > p.target.x2) return false;
  if (p.mouse.down.y < p.target.y1) return false;
  if (p.mouse.down.y > p.target.y2) return false;
  return true;
};
