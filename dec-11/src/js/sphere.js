import * as THREE from 'three';
import { CircleTexture } from './circle-texture';

function Sphere({fragmentShader, vertexShader}) {

  const textureLoader = new THREE.TextureLoader();
  textureLoader.crossOrigin = '';

  const geo = new THREE.IcosahedronGeometry(20, 4);
  const material = new THREE.ShaderMaterial( {
    uniforms: {
      time: { value: 0.0 },
      texture: { value: new THREE.CanvasTexture(CircleTexture({})) },
      // texture: { value: textureLoader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1081752/spark1.png") },
      resolution: { value: new THREE.Vector2() }
    },
    fragmentShader,
    vertexShader
  });
  material.uniforms.texture.value.wrapS = material.uniforms.texture.value.wrapT = THREE.RepeatWrapping
  const sphere = new THREE.Mesh(geo, material);
  sphere.rotation.set(0, Math.PI, 0);
  return sphere;
}

export default Sphere;
