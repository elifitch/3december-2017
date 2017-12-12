function CircleTexture({resolution = 64, radius = 32, color = '#ffffff', debug = false}) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.height = resolution;
  canvas.width = resolution;

  if (debug) {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    document.body.appendChild(canvas);
  }

  const x = resolution / 2;
  const y = resolution / 2;
  const drawRadius = resolution / 2 / radius;
  const startAngle = 0;
  const endAngle = Math.PI * 2;

  ctx.fillStyle = color;

  ctx.arc(x, y, radius, startAngle, endAngle);
  ctx.fill();

  return canvas;
}

export { CircleTexture };