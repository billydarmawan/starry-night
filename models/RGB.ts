export type TRGB = {
  r: number;
  g: number;
  b: number;
};

export type TRGBParams =
  | [rgb: number | TRGB]
  | [r: number, g: number, b: number];
export function RGB(...params: TRGBParams): TRGB {
  if (params.length === 1) {
    if (isRGB(params[0])) {
      return {
        r: params[0].r,
        g: params[0].g,
        b: params[0].b,
      };
    }
    return {
      r: params[0],
      g: params[0],
      b: params[0],
    };
  }
  return {
    r: params[0],
    g: params[1],
    b: params[2],
  };
}

export function rgbAdd(it: TRGB, val: number | TRGB): TRGB {
  if (isRGB(val)) {
    return {
      r: it.r + val.r,
      g: it.g + val.g,
      b: it.b + val.b,
    };
  }
  return {
    r: it.r + val,
    g: it.g + val,
    b: it.b + val,
  };
}

export function isRGB(val: any): val is TRGB {
  return val.r && val.g && val.b;
}
