import '../css/reset.css';
import '../css/style.css';
import * as THREE from 'three';
import frag from './shaders/frag.glsl';
import vert from './shaders/vert.glsl';
import Renderer from './renderer';
import Scene from './scene';
import Sphere from './sphere';
import makeOrbitControls from 'three-orbit-controls';
const OrbitControls = makeOrbitControls(THREE);

const containerEl = document.getElementsByClassName('container')[0];

const renderer = Renderer({containerEl});
const { scene, camera } = Scene({
  cameraPos: [5, 0, 0],
  cameraAspect: containerEl.offsetWidth / containerEl.offsetHeight,
  cameraFov: 45
});

const controls = new OrbitControls(camera);
controls.enableDamping = true;
controls.rotateSpeed = 0.5;
controls.dampingFactor = 0.25;

const time = {value: 1.0}

scene.add(Sphere({
  fragmentShader: frag, 
  vertexShader: vert,
  uniforms: {
    time,
    resolution: { value: new THREE.Vector2() }
  }
}));

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
