// #pragma glslify: pnoise = require('glsl-noise/classic/3d');
varying vec2 vUv;
varying float noise;
uniform float time;

void main() {

  // compose the colour using the UV coordinate
  // and modulate it with the noise like ambient occlusion
  // vec3 color = vec3( vUv * ( 1. - 2. * noise ), 0.0 );
  // gl_FragColor = vec4( color.rgb, 1.0 );
  gl_FragColor = vec4( vec3(1. - 2.0 * noise), 1.0 );

}