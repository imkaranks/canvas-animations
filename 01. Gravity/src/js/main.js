import { randomInt } from "./utils";

const canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  gravity = 1,
  friction = 0.9,
  mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

let balls;

class Ball {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = `rgb(
      ${200 - (200 / innerWidth) * (this.x - this.radius)}
      0
      ${200 - (200 / innerHeight) * (this.y - this.radius)}
      / 0.5
    )`;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }

  update() {
    if (
      this.x + this.radius + this.dx > innerWidth ||
      this.x - this.radius <= 0
    ) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius + this.dy > innerHeight) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  balls = new Array(50).fill(null).map(() => {
    const radius = randomInt(5, 15);
    return new Ball(
      randomInt(radius, window.innerWidth - radius),
      randomInt(radius, window.innerHeight - radius),
      randomInt(-2, 2),
      2,
      radius
    );
  });
}

function animate() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  requestAnimationFrame(animate);

  balls.forEach((object) => object.update());
}

window.addEventListener("mousemove", function ({ clientX, clientY }) {
  mouse.x = clientX;
  mouse.y = clientY;
});

["resize", "click"].forEach((event) => window.addEventListener(event, init));

init();
animate();
