import { useEffect, useRef, useState } from "react";

type ReactUseEffect = typeof useEffect;

export const useMountEffect: ReactUseEffect = (effect, deps) => {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (!mount) return;
    effect();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setMount(true);
  }, []);
};

export const useDidChange: ReactUseEffect = (effect, deps) => {
  const ref = useRef(deps);
  useEffect(() => {
    if (ref.current === deps) return;
    effect();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};
