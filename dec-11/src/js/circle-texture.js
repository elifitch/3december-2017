function CircleTexture({resolution = 64, color = '#ffffff'}) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.height = resolution * window.devicePixelRatio * 6;
  canvas.width = resolution * window.devicePixelRatio * 6;

  const x = resolution * window.devicePixelRatio;
  const y = resolution * window.devicePixelRatio;
  // const x = 64;
  // const y = 64;
  const radius = resolution * window.devicePixelRatio;
  // const radius = 64;
  const startAngle = 0;
  const endAngle = Math.PI * 2;

  ctx.fillStyle = color;

  ctx.arc(x, y, radius, startAngle, endAngle);
  ctx.fill();

  return canvas;
}

export { CircleTexture };