export type TVector2D = {
  x: number;
  y: number;
};

type TVector2DParams = [vec: number | TVector2D] | [x: number, y: number];
export function Vector2D(...params: TVector2DParams): TVector2D {
  if (params.length === 1) {
    if (isVector2D(params[0])) {
      return {
        x: params[0].x,
        y: params[0].y,
      };
    }
    return {
      x: params[0],
      y: params[0],
    };
  }
  return {
    x: params[0],
    y: params[1],
  };
}

export function isVector2D(val: any): val is TVector2D {
  return val.x && val.y;
}

type TSign = "+" | "-" | "*" | "/";
export function vector2DCalc(
  sign: TSign,
  vec1: TVector2D,
  vec2: TVector2D | number
): TVector2D {
  if (isVector2D(vec2)) {
    return {
      x: calc(sign, vec1.x, vec2.x),
      y: calc(sign, vec1.y, vec2.y),
    };
  }
  return {
    x: calc(sign, vec1.x, vec2),
    y: calc(sign, vec1.y, vec2),
  };
}
function calc(sign: TSign, a: number, b: number) {
  switch (sign) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
  }
}
