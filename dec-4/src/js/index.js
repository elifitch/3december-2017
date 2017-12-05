import '../css/reset.css';
import '../css/style.css';
import * as THREE from 'three';
import frag from './shaders/frag.glsl';
import vert from './shaders/vert.glsl';
import Renderer from './renderer';
import Scene from './scene';
import Sphere from './sphere';
import Animate from './animate';
import 'three/OrbitControls';

const containerEl = document.getElementsByClassName('container')[0];

const { scene, camera } = Scene({
  cameraPos: [5, 0, 0],
  cameraAspect: containerEl.offsetWidth / containerEl.offsetHeight,
  cameraFov: 45
});

const renderer = Renderer({ containerEl, scene, camera });

const controls = new THREE.OrbitControls(camera);
controls.enableDamping = true;
controls.rotateSpeed = 0.5;
controls.dampingFactor = 0.25;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.3;

const time = {value: 1.0}
const sphereParams = {
  fragmentShader: frag,
  vertexShader: vert,
  uniforms: {
    time,
    resolution: { value: new THREE.Vector2() }
  }
};

const hemi = new THREE.Object3D();
hemi.add(
  Sphere(Object.assign(sphereParams, {
    position: [0, 0.5, 0.5],
    rotation: [Math.PI, 0, 0]
  }))
);
hemi.add(
  Sphere(Object.assign(sphereParams, {
    position: [0, 0.5, -0.5],
    rotation: [Math.PI/2, 0, 0]
  }))
);
hemi.add(
  Sphere(Object.assign(sphereParams, {
    position: [0, -0.5, 0.5],
    rotation: [(3*Math.PI)/2, 0, 0]
  }))
);
hemi.add(
  Sphere(Object.assign(sphereParams, {
    position: [0, -0.5, -0.5],
    rotation: [0, 0, 0]
  }))
);
hemi.position.set(-0.5, 0, 0);
scene.add(hemi);

const hemi2 = new THREE.Object3D();
hemi2.add(
  Sphere(Object.assign(sphereParams, {
    position: [0, 0.5, 0.5],
    rotation: [Math.PI, 0, 0]
  }))
);
hemi2.add(
  Sphere(Object.assign(sphereParams, {
    position: [0, 0.5, -0.5],
    rotation: [Math.PI / 2, 0, 0]
  }))
);
hemi2.add(
  Sphere(Object.assign(sphereParams, {
    position: [0, -0.5, 0.5],
    rotation: [(3 * Math.PI) / 2, 0, 0]
  }))
);
hemi2.add(
  Sphere(Object.assign(sphereParams, {
    position: [0, -0.5, -0.5],
    rotation: [0, 0, 0]
  }))
);
hemi2.position.set(0.5, 0, 0)
hemi2.rotation.set(0, Math.PI, 0)
scene.add(hemi2);

function RenderLoop() {
  time.value += 1;
  if (controls) {
    controls.update();
  }
  window.requestAnimationFrame(RenderLoop);
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  renderer.setSize(containerEl.offsetWidth, containerEl.offsetHeight);
  camera.aspect = containerEl.offsetWidth / containerEl.offsetHeight;
  camera.updateProjectionMatrix();
});

RenderLoop();
Animate(hemi);
Animate(hemi2);
