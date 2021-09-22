export const main = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const img = new Image();
  img.src = "/img.jpeg";
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0);
  }
}