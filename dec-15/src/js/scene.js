import * as THREE from 'three';

function Scene({cameraPos, cameraFov, cameraAspect}) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( cameraFov, cameraAspect, 1, 10000 );

  const dirLight = new THREE.DirectionalLight(0xFFFFFF);
  dirLight.castShadow = true;
  dirLight.position.set(10, 5, 5);
  const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 2, 0xFF00FF);
  const ambientLight = new THREE.AmbientLight(0x666);

  const bgPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.ShadowMaterial({
      color: 0xdddddd
    })
  );
  bgPlane.receiveShadow = true;
  bgPlane.position.set(0, 0, -0.5);

	camera.position.set(...cameraPos);
	camera.lookAt(scene.position);
	
  scene.add(camera);
  scene.add(dirLightHelper);
  scene.add(dirLight);
  scene.add(ambientLight);
  scene.add(bgPlane);
  return { scene, camera };
}

export default Scene;