import * as THREE from 'three';

function Sphere({fragmentShader, vertexShader, uniforms, position, rotation}) {
  const geo = new THREE.IcosahedronGeometry(1, 4);
  const material = new THREE.ShaderMaterial( {
    uniforms,
    fragmentShader,
    vertexShader,
    wireframe: false
  });
  material.transparent = true;
  const mesh = new THREE.Mesh(geo, material);
  mesh.rotation.set(0, Math.PI, 0);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  return mesh;
}

export default Sphere;
