#pragma glslify: pnoise = require('glsl-noise/periodic/3d');

uniform float time;

varying vec2 vUv;
varying vec3 pos;
varying float noise;

attribute float size;

float fac = 10.0;

float turbulence( vec3 p ) {

  // float w = 100.0;
  float t = -.5;

  for (float f = 1.0 ; f <= 1.0 ; f++ ) {
    float power = pow( 2.0, f );
    t += abs(
      pnoise(
        vec3( power * p ),
        vec3( fac, fac, fac )
      ) / power
    );
  }

  return t;

}

void main() {

  vUv = uv * 200.0;

  // get a turbulent 3d noise using the normal, normal to high freq
  noise = 10.0 *  -.10 * turbulence( .5 * normalize(position) + time );

  // get a 3d noise using the position, low frequency
  float b = 5.0 * pnoise( 0.05 * position, vec3( 100.0 ) );
  // compose both noises
  float displacement = (- 10. * noise) + b;

  // move the position along the normal and transform it
  vec3 newPosition = position + (normalize(position) * displacement);
  pos = newPosition;

  vec4 mvPosition = modelViewMatrix * vec4( newPosition, 1.0 );
  gl_PointSize = size * (300. / -mvPosition.z);
  
  gl_Position = projectionMatrix * mvPosition;
  

}