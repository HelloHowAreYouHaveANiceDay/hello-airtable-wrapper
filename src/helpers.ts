export const isNothing = (any): boolean => {
  return any === NaN || any === null || any === undefined;
};
