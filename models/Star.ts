import { useEffect, useState } from "react";
import { useWindowSize } from "./Window";

import { RGB, rgbAdd, TRGB } from "./RGB";
import { TVector2D, Vector2D, vector2DCalc } from "./Vector";
import { Sequence } from "./Sequence";

const nextStarId = Sequence();

const STAR_SIZE = 1 + 16;
const NEW_STAR_TIME = 50;

export type TStar = {
  id: number;
  pos: TVector2D;
  color: TRGB;
  dpos: TVector2D;
  dcolor: TRGB;
  scale: {
    width: number;
    height: number;
  };
  lifespanTime: number;
};

export function useStars() {
  const [width, height] = useWindowSize();
  const [stars, setStars] = useState<TStar[]>([]);
  const [isActive, setActive] = useState(true);

  useEffect(() => {
    let nextAnimationFrame = 0;
    let time = performance.now();
    let newStar = NEW_STAR_TIME;

    function mainLoop() {
      nextAnimationFrame = requestAnimationFrame(mainLoop);
      const now = performance.now();
      let deltaTime = now - time || 1;
      time = now;

      if (deltaTime > 1000) {
        console.warn("resume..", deltaTime);
        deltaTime = 1000 / 60;
        return;
      }

      setStars((st) => {
        // update phase
        let stars = st.map((s) => {
          let pos = vector2DCalc(
            "+",
            s.pos,
            vector2DCalc("/", s.dpos, deltaTime)
          );

          let scale = s.scale;
          if (s.scale.width !== width || s.scale.height !== height) {
            pos = Vector2D(
              (width / scale.width) * pos.x,
              (height / scale.height) * pos.y
            );
            scale = { ...scale, width, height };
          }

          let lifespan = s.lifespanTime - deltaTime;
          if (
            !(
              s.lifespanTime > 0 &&
              s.pos.x < width - STAR_SIZE &&
              s.pos.y < height - STAR_SIZE
            )
          ) {
            pos = Vector2D(-100, -100);
            lifespan = -100; // recycle-star
          }

          return {
            ...s,
            pos,
            scale,
            color: rgbAdd(s.color, s.dcolor),
            lifespanTime: lifespan,
          };
        });

        // create phase
        newStar -= deltaTime;
        while (newStar < 0) {
          newStar += NEW_STAR_TIME;
          const star = {
            id: nextStarId(),
            pos: {
              x: Math.floor(Math.random() * width - STAR_SIZE),
              y: Math.floor(Math.random() * height - STAR_SIZE),
            },
            dpos: {
              x: Math.random() * 0.25 * (Math.random() > 0.5 ? -1 : 1),
              y: Math.random() * 0.25 * (Math.random() > 0.5 ? -1 : 1),
            },
            color: RGB(100 + Math.round(Math.random() * 155)),
            dcolor: RGB(Math.random() > 0.5 ? 1 : -1),
            scale: {
              width,
              height,
            },
            lifespanTime: 6000 + width + height,
          };

          const reuseStarIndex = stars.findIndex(
            (s) => s.lifespanTime === -100
          );
          if (reuseStarIndex !== -1) {
            stars[reuseStarIndex].pos = star.pos;
            stars[reuseStarIndex].dpos = star.dpos;
            stars[reuseStarIndex].color = star.color;
            stars[reuseStarIndex].dcolor = star.dcolor;
            stars[reuseStarIndex].scale = star.scale;
            stars[reuseStarIndex].lifespanTime = star.lifespanTime;
          } else {
            stars.push(star);
          }
        }
        return stars;
      });
    }

    if (isActive) {
      mainLoop();
    }
    return () => {
      window.cancelAnimationFrame(nextAnimationFrame);
    };
  }, [width, height, isActive]);

  return { stars, isActive, setActive, setStars };
}
