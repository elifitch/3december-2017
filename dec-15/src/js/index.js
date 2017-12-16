import '../css/reset.css';
import '../css/style.css';
import * as THREE from 'three';
import Renderer from './renderer';
import Scene from './scene';
import RenderLoop from './render-loop';
import MakeGrid from './camera-grid';
import Look from './look';

const containerEl = document.getElementsByClassName('container')[0];
let cW = containerEl.offsetWidth;
let cH = containerEl.offsetHeight;

const renderer = Renderer({ containerEl });
const cameraElevation = 2;
const { scene, camera } = Scene({
  cameraPos: [0, cameraElevation, 250],
  cameraAspect: cW / cH,
  cameraFov: 20
});
camera.lookAt(0, cameraElevation, 0)

const grid = MakeGrid(10, 6);
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

RenderLoop({renderer, scene, camera});
