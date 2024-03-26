import { randomInt, getDistance } from "./utils";

const canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

let balls;

function rotate(dx, dy, angle) {
  const rotatedVelocities = {
    x: dx * Math.cos(angle) - dy * Math.sin(angle),
    y: dx * Math.sin(angle) + dy * Math.cos(angle),
  };

  return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.dx - otherParticle.dx;
  const yVelocityDiff = particle.dy - otherParticle.dy;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    const angle = -Math.atan2(
      otherParticle.y - particle.y,
      otherParticle.x - particle.x
    );

    // Store mass in var for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotate(particle.dx, particle.dy, angle);
    const u2 = rotate(otherParticle.dx, otherParticle.dy, angle);

    // Velocity after 1d collision equation
    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y,
    };
    const v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: u2.y,
    };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1.x, v1.y, -angle);
    const vFinal2 = rotate(v2.x, v2.y, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.dx = vFinal1.x;
    particle.dy = vFinal1.y;

    otherParticle.dx = vFinal2.x;
    otherParticle.dy = vFinal2.y;
  }
}

class Ball {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.mass = 1;
    this.opacity = 0;
    this.color = `rgb(
      ${200 - (200 / innerWidth) * (this.x - this.radius)}
      0
      ${200 - (200 / innerHeight) * (this.y - this.radius)}
    )`;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
  }

  update(balls) {
    for (const ball of balls) {
      if (this === ball) continue;
      if (
        getDistance(this.x, this.y, ball.x, ball.y) -
          (this.radius + ball.radius) <
        0
      ) {
        resolveCollision(this, ball);
        // console.log("💥 collided 💥");
      }
    }

    if (
      this.x + this.radius / 2 > innerWidth - this.radius / 2 ||
      this.x - this.radius < 0
    ) {
      this.dx = -this.dx;
    }

    if (
      this.y + this.radius / 2 > innerHeight - this.radius / 2 ||
      this.y - this.radius < 0
    ) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    if (
      getDistance(this.x, this.y, mouse.x, mouse.y) < 100 &&
      this.opacity < 0.75
    ) {
      this.opacity += 0.05;
    } else if (this.opacity > 0) {
      this.opacity = Math.max(0, this.opacity - 0.05);
    }

    this.draw();
  }
}

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  balls = [];

  const radius = Math.max(15, (1.5 / 100) * innerWidth);
  for (let i = 0; i < 100; i++) {
    let x = randomInt(radius, innerWidth - radius),
      y = randomInt(radius, innerHeight - radius);

    while (
      i > 0 &&
      balls.findIndex(
        (ball) => getDistance(x, y, ball.x, ball.y) - (radius + ball.radius) < 0
      ) !== -1
    ) {
      x = randomInt(radius, innerWidth - radius);
      y = randomInt(radius, innerHeight - radius);
    }

    balls.push(
      new Ball(
        x,
        y,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        radius
      )
    );
  }
}

function animate() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  requestAnimationFrame(animate);

  balls.forEach((ball) => ball.update(balls));
}

window.addEventListener("mousemove", function ({ clientX, clientY }) {
  mouse.x = clientX;
  mouse.y = clientY;
});

window.addEventListener("resize", init);

init();
animate();
