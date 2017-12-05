#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

uniform float time;
varying vec2 vUv;

void main() {
  float noiseScale = 10.0;
  float timeScale = time*0.005;
  vec3 vec = vec3(vUv.s*noiseScale, vUv.t*noiseScale, timeScale);
  float r = min(snoise3(vec) + 1.0, 0.5);
  float g = max(snoise3(vec) + 1.0, 1.0);
  float b = min(snoise3(vec) + 1.0, 0.5);
  float a = snoise3(vec);
  gl_FragColor = vec4(r*1.3, g*0.8, b*0.8, 1.0);
}