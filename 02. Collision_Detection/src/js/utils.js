export const randomInt = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min)) + min;

export const getDistance = (x1, y1, x2, y2) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
