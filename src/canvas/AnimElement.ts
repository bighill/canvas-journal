export interface AnimElement {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  colorBg: string;
}

export const defaultAnimElement: AnimElement = {
  colorBg: "grey",
  x1: 0,
  y1: 0,
  x2: 50,
  y2: 50,
};
