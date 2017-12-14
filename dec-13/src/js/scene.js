import * as THREE from 'three';

function Scene({cameraPos, cameraFov, cameraAspect}) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( cameraFov, cameraAspect, 1, 10000 );
  const hemiLight = new THREE.HemisphereLight('#FFFFFF', '#B99486', 1.5);
	camera.position.set(...cameraPos);
	camera.lookAt(scene.position);
	
  scene.add(camera);
  scene.add(hemiLight);
  return { scene, camera };
}

export default Scene;