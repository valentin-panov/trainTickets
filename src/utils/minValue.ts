export const minValue = (obj: { [key: string]: number }): number => {
  const arr = Object.values(obj);
  return Math.min(...arr);
};
