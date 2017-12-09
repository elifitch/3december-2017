import * as THREE from 'three';

function Sphere({fragmentShader, vertexShader}) {
  // const geo = new THREE.IcosahedronGeometry(1, 4);
  const geo = new THREE.IcosahedronGeometry(20, 4);
  const material = new THREE.ShaderMaterial( {
    uniforms: {
      time: { value: 0.0 },
      resolution: { value: new THREE.Vector2() }
    },
    fragmentShader,
    vertexShader
  });
  const sphere = new THREE.Mesh(geo, material);
  sphere.rotation.set(0, Math.PI, 0);
  return sphere;
}

export default Sphere;
