export function Sequence() {
  let id = Date.now();
  return () => {
    return id++;
  };
}
