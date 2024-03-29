import { hue } from "@/js/main";

export default class Particle {
  constructor(position, velocity, size) {
    this.position = position;
    this.velocity = velocity;
    this.size = size;
    this.color = `hsl(${hue}, 100%, 50%)`;
  }

  /**
   * Draws the object on the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  /**
   * Updates the position of the object based on its velocity and handles boundary conditions.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  update(ctx) {
    this.position.add(this.velocity);
    if (this.size > 0.2) this.size -= 0.1;
    this.draw(ctx);
  }
}
