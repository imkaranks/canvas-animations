import { distance } from "@core/utils/helpers";

/**
 * Checks if two rectangles collide with each other.
 * @param {Object} rectA - The first rectangle object with properties { position: { x, y }, width, height }.
 * @param {Object} rectB - The second rectangle object with properties { position: { x, y }, width, height }.
 * @returns {boolean} - True if the rectangles collide, false otherwise.
 */
export const didRectCollide = (rectA, rectB) => {
  return (
    rectA.position.x < rectB.position.x + rectB.width &&
    rectA.position.x + rectA.width > rectB.position.x &&
    rectA.position.y < rectB.position.y + rectB.height &&
    rectA.position.y + rectA.height > rectB.position.y
  );
};

/**
 * Checks if two circles collide with each other.
 * @param {Object} circleA - The first circle object with properties { position: { x, y }, radius }.
 * @param {Object} circleB - The second circle object with properties { position: { x, y }, radius }.
 * @returns {boolean} - True if the circles collide, false otherwise.
 */
export const didCircCollide = (circleA, circleB) => {
  return (
    distance(
      circleA.position.x,
      circleB.position.x,
      circleA.position.y,
      circleB.position.y
    ) <
    circleA.radius + circleB.radius
  );
};
