// Linear interpolation function (lerp)
export const lerp = (start, end, t) => {
  t = Math.max(0, Math.min(1, t));
  return start * (1 - t) + end * t;
};

// Clamping function
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

export const randomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const distance = (vecA, vecB) => {
  const dx = vecA.x - vecB.x;
  const dy = vecA.y - vecB.y;
  return Math.hypot(dx, dy);
};
