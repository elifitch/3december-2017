import * as THREE from 'three';
import { CircleTexture } from './circle-texture';

function Sphere({fragmentShader, vertexShader}) {

  const PARTICLE_SIZE = 1;
  const textureAttr = {
    resolution: 64,
    radius: 32,
    color: '#ffffff'
  };

  const geo = new THREE.IcosahedronGeometry(20, 5);
  const vertices = geo.vertices;
  const positions = new Float32Array(vertices.length * 3);
  const sizes = new Float32Array(vertices.length);

  vertices.forEach((vert, i) => {
    vert.toArray(positions, i * 3);
    sizes[i] = PARTICLE_SIZE;
  });

  const bufferGeo = new THREE.BufferGeometry();
  bufferGeo.addAttribute('position', new THREE.BufferAttribute(positions, 3));
  bufferGeo.addAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.ShaderMaterial( {
    uniforms: {
      time: { value: 0.0 },
      texture: { value: new THREE.CanvasTexture(CircleTexture(textureAttr)) },
      resolution: { value: new THREE.Vector2() }
    },
    fragmentShader,
    vertexShader,
    transparent: true,
    alphaTest: 0.9
  });
  material.uniforms.texture.value.wrapS = THREE.RepeatWrapping;
  material.uniforms.texture.value.wrapT = THREE.RepeatWrapping;
  const sphere = new THREE.Points(bufferGeo, material);
  sphere.rotation.set(0, Math.PI, 0);
  return sphere;
}

export default Sphere;
