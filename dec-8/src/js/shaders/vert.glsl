//#pragma glslify: cnoise3 = require('glsl-noise/classic/3d');
#pragma glslify: pnoise = require('./ashima-pnoise');

varying vec2 vUv;
varying float noise;

float fac = 10.0;

float turbulence( vec3 p ) {

  float w = 100.0;
  float t = -.5;

  for (float f = 1.0 ; f <= 10.0 ; f++ ){
    float power = pow( 2.0, f );
    t += abs(pnoise( vec3( power * p ), vec3( fac, fac, fac ) ) / power );
  }

  return t;

}

void main() {

  vUv = uv;

  // get a turbulent 3d noise using the normal, normal to high freq
  noise = 10.0 *  -.10 * turbulence( .5 * normal );
  // get a 3d noise using the position, low frequency
  float b = 5.0 * pnoise( 0.05 * position, vec3( 100.0 ) );
  // compose both noises
  float displacement = - 10. * noise + b;

  // move the position along the normal and transform it
  vec3 newPosition = position + normal * displacement;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

}