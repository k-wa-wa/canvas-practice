

export const main = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const particleArray: Particle[] = [];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const mouse = {
    x: -Infinity,
    y: -Infinity,
    radius: 150
  }

  const handleMouse = (event: MouseEvent) => {
    mouse.x = event.x;
    mouse.y = event.y;
  }

  window.addEventListener("mousemove", handleMouse);

  const pixel = 30
  ctx.fillStyle = "white";
  ctx.font = `${pixel}px Verdana`;
  ctx.fillText("Text Animation", 0, pixel, 500);
  const textCoordinates = ctx.getImageData(0, 0, 500, pixel * 2);

  class Particle {
    #destX: number;
    #destY: number;
    #x: number;
    #y: number;
    #size = 3;
    #duration = 20;
    constructor(destX: number, destY: number) {
      this.#destX = destX;
      this.#destY = destY;
      this.#x = Math.random() * canvas.width;
      this.#y = Math.random() * canvas.height;
    }
    draw() {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(this.#x, this.#y, this.#size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
    update() {
      this.mouseEvent();
      this.gather();
    }
    mouseEvent() {
      const dx = this.#x - mouse.x;
      const dy = this.#y - mouse.y;
      const distance = Math.sqrt(dx ** 2 + dy ** 2);
      const maxDistance = mouse.radius;
      if (distance < maxDistance) {
        this.#x += dx / distance * 10;
        this.#y += dy / distance * 10;
      }

    }
    gather() {
      const dx = this.#destX - this.#x;
      const dy = this.#destY - this.#y;
      if (dx !== 0) {
        this.#x += dx / this.#duration;
      }
      if (dy !== 0) {
        this.#y += dy / this.#duration;
      }
    }
  }

  const init = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x1 = 0, x2 = textCoordinates.width; x1 < x2; x1++) {
      for (let y1 = 0, y2 = textCoordinates.height; y1 < y2; y1++) {
        const opacity = textCoordinates.data[(y1 * 4 * textCoordinates.width) + (x1 * 4) + 3]
        if (opacity >= 128) {
          particleArray.push(new Particle(x1 * 5, y1 * 5));
        }
      }
    }
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].draw();
      particleArray[i].update();
    }
    window.requestAnimationFrame(() => animate());
  }

  init();
  animate();

  return () => window.removeEventListener("mousemove", handleMouse)
}