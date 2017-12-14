import '../css/reset.css';
import '../css/style.css';
import * as THREE from 'three';
import Renderer from './renderer';
import Scene from './scene';
import RenderLoop from './render-loop';
import GetDonut from './donut';
import 'three/OrbitControls';

const containerEl = document.getElementsByClassName('container')[0];
let cW = containerEl.offsetWidth;
let cH = containerEl.offsetHeight;

const renderer = Renderer({containerEl});
const { scene, camera } = Scene({
  cameraPos: [10, 0, 0],
  cameraAspect: cW / cH,
  cameraFov: 45
});

const controls = new THREE.OrbitControls(camera);
controls.enableDamping = true;
controls.rotateSpeed = 0.5;
controls.autoRotate = true;
controls.dampingFactor = 0.25;

GetDonut().then(obj => {
  scene.add(obj);
});

window.addEventListener('resize', () => {
  cW = containerEl.offsetWidth;
  cH = containerEl.offsetHeight;
  renderer.setSize(cW, cH);
  camera.aspect = cW / cH;
  camera.updateProjectionMatrix();
});

RenderLoop({renderer, scene, camera, controls});
