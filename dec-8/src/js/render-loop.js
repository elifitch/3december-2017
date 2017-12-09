function RenderLoop({renderer, scene, camera, controls, time}) {
  if (controls) {
    controls.update();
  }
  time.value += 0.0025;
  window.requestAnimationFrame(() => RenderLoop({renderer, scene, camera, controls, time}));
  renderer.render(scene, camera);
}

export default RenderLoop;