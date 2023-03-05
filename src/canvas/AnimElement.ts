export interface AnimElement {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  radius: number;
  colorBg: string;
}

export const defaultAnimElement: AnimElement = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  radius: 0,
  colorBg: "grey",
};
