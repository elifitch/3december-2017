import '../css/reset.css';
import '../css/style.css';
import * as THREE from 'three';
import Renderer from './renderer';
import Scene from './scene';
import RenderLoop from './render-loop';
import MakeRecties from './recty';
import Look from './look';
import 'three/OrbitControls';

const containerEl = document.getElementsByClassName('container')[0];
let cW = containerEl.offsetWidth;
let cH = containerEl.offsetHeight;

const renderer = Renderer({containerEl, clearColor: 0xEFEFEF});
const { scene, camera } = Scene({
  cameraPos: [0, 0, 10],
  cameraAspect: cW / cH,
  cameraFov: 45
});

const controls = new THREE.OrbitControls(camera);
controls.enableDamping = true;
controls.rotateSpeed = 0.5;
controls.dampingFactor = 0.25;

const grid = MakeRecties(20, 20);
scene.add(grid);

window.addEventListener('resize', () => {
  let cW = containerEl.offsetWidth;
  let cH = containerEl.offsetHeight;
  renderer.setSize(cW, cH);
  camera.aspect = cW / cH;
  camera.updateProjectionMatrix();
});

window.addEventListener('mousemove', (e) => {
  Look(grid, e.clientX, e.clientY, camera);
})

RenderLoop({renderer, scene, camera, controls});
