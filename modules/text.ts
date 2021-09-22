
export const main = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  let particleArray: Particle[] = [];
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

  ctx.fillStyle = "white";
  ctx.font = "20px Verdana";
  ctx.fillText("A", 0, 40);
  const textCoordinates = ctx.getImageData(0, 0, 150, 100);

  class Particle {
    x: number; // 中心のx座標
    y: number; // 中心のy座標
    size: number; // 円の半径
    baseX: number;
    baseY: number;
    density: number;
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.size = 3;
      this.baseX = x;
      this.baseY = y;
      this.density = (Math.random() * 30) + 1;
    }
    draw() {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.closePath();
      ctx.fill();
    }
    update() {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx ** 2 + dy ** 2);
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const maxDistance = mouse.radius;
      const force = (maxDistance - distance) / maxDistance;
      const directionX = forceDirectionX * force * this.density;
      const directionY = forceDirectionY * force * this.density;
      if (distance < maxDistance) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        if (this.x !== this.baseX) {
          this.x -= (this.x - this.baseX) / 10;
        }
        if (this.y !== this.baseY) {
          this.y -= (this.y - this.baseY) / 10;
        }
      }
    }
  }

  const init = () => {
    particleArray = [];
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
      for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
        if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
          particleArray.push(
            new Particle(x * 10, y * 10)
          );
        }
      }
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].draw();
      particleArray[i].update();
    }
    requestAnimationFrame(animate);
  }

  init();
  animate();

  return () => window.removeEventListener("mousemove", handleMouse);
}

