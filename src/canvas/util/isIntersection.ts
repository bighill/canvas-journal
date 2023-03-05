import { AnimElement } from "../AnimElement";
import { Pointer } from "./pointer";

export const shapes = {
  RECTANGLE: "rectangle",
};

interface Props {
  shape: string;
  pointer: Pointer;
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
  if (p.pointer.down.x < p.target.x1) return false;
  if (p.pointer.down.x > p.target.x2) return false;
  if (p.pointer.down.y < p.target.y1) return false;
  if (p.pointer.down.y > p.target.y2) return false;
  return true;
};
