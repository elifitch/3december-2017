import * as THREE from 'three';

function Renderer({containerEl, clearColor}) {
  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const w = containerEl.offsetWidth;
  const h = containerEl.offsetHeight;
  renderer.setSize(w, h);
  if (clearColor) {
    renderer.setClearColor(clearColor);
  }
  renderer.setPixelRatio(window.devicePixelRatio);
  containerEl.appendChild(renderer.domElement);
  return renderer;
}

export default Renderer;