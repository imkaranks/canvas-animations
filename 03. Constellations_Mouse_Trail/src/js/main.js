import { distance as getDistance } from "@core/utils/helpers";
import Vector from "@core/math/Vector";
import Particle from "@objects/Particle";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

let canvasWidth = (canvas.width = innerWidth);
let canvasHeight = (canvas.height = innerHeight);
let particles;
let hue = 0;

// ######### Initialize #########
function init() {
  canvasWidth = canvas.width = innerWidth;
  canvasHeight = canvas.height = innerHeight;

  particles = [];
}

// ######### Animate #########
function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  requestAnimationFrame(animate);

  for (let i = 0; particles.length && i < particles.length; i++) {
    particles[i].update(ctx);

    for (let j = i; j < particles.length; j++) {
      const distance = getDistance(
        particles[i].position,
        particles[j].position
      );

      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particles[i].color;
        ctx.lineWidth = 0.2;
        ctx.moveTo(particles[i].position.x, particles[i].position.y);
        ctx.lineTo(particles[j].position.x, particles[j].position.y);
        ctx.stroke();
        ctx.closePath();
      }
    }

    if (particles[i].size < 0.3) {
      particles.splice(i, 1);
      i--;
    }
  }
}

// ######### Event Listeners #########
["mousemove", "touchmove"].forEach((event) => {
  addEventListener(event, (evt) => {
    if (event === "touchmove") {
      const touches = evt.changedTouches;

      for (let i = 0; i < touches.length; i++) {
        mouse.x = touches[i].clientX;
        mouse.y = touches[i].clientY;

        createParticle();
      }
    } else {
      mouse.x = evt.clientX;
      mouse.y = evt.clientY;

      createParticle();
    }

    hue++;
  });
});

function createParticle() {
  const size = Math.random() * (10 - 1) + 1;
  const mousePos = new Vector(mouse.x, mouse.y);
  const velocity = new Vector(Math.random() * 4 - 2, Math.random() * 4 - 2);
  particles.push(new Particle(mousePos, velocity, size));
}

addEventListener("resize", init);

addEventListener("load", () => {
  init();
  animate();
});

export { hue };
