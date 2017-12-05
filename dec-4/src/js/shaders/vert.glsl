#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

varying vec2 vUv;
uniform float time;

void main() {
  vUv = uv;
  float noiseScale = 10.0;
  float timeScale = time*0.005;
  vec3 vec = vec3(vUv.s*noiseScale, vUv.t*noiseScale, timeScale);
  vec3 translatedPos = min(position * snoise3(vec), position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(translatedPos, 1.0);
}