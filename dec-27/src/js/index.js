import '../css/reset.css';
import '../css/style.css';
import * as THREE from 'three';
import frag from './shaders/example-frag.glsl'
import Renderer from './renderer';
import Scene from './scene';
import RenderLoop from './render-loop';
import ImportModel from './import-model';
import 'three/OrbitControls';

const initialZoom = 20;
const cameraShift = [-5, 5]

const containerEl = document.getElementsByClassName('container')[0];
let cW = containerEl.offsetWidth;
let cH = containerEl.offsetHeight;

const renderer = Renderer({ containerEl, clearColor: '#F086C7'});
const { scene, camera } = Scene({
  cameraPos: [-2.5, 7.5, initialZoom],
  cameraAspect: cW / cH,
  cameraFov: 45
});

const controls = new THREE.OrbitControls(camera);
controls.enableDamping = true;
controls.rotateSpeed = 0.5;
controls.dampingFactor = 0.25;
controls.target = new THREE.Vector3(-2.5, 0, 0)

ImportModel({}).then(model => {
  scene.add(model);
})

window.addEventListener('resize', () => {
  let cW = containerEl.offsetWidth;
  let cH = containerEl.offsetHeight;
  renderer.setSize(cW, cH);
  camera.aspect = cW / cH;
  camera.updateProjectionMatrix();
});

window.scene = scene;
window.THREE = THREE;

RenderLoop({renderer, scene, camera, controls});
