import * as THREE from 'three';

function Scene({cameraPos, cameraFov, cameraAspect}) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( cameraFov, cameraAspect, 1, 10000 );

  const spotLight = new THREE.SpotLight(0xFFFFFF, 1, 200, 1.0, 0.1, 2);
  spotLight.castShadow = true;
  spotLight.position.set(20, 20, 60);
  spotLight.shadow.mapSize.width = 256;
  spotLight.shadow.mapSize.height = 256;
  spotLight.shadow.camera.near = 0.5;
  spotLight.shadow.camera.far = 1000;
  const ambientLight = new THREE.AmbientLight(0x111111);
  const hemiLight = new THREE.HemisphereLight(0xFFFFFF, '#867a6a', 1);

  const bgPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(150, 150),
    new THREE.ShadowMaterial({
      color: 0x111111,
      opacity: 0.1
    })
  );
  bgPlane.receiveShadow = true;
  bgPlane.position.set(0, 0, -0.5);

	camera.position.set(...cameraPos);
	camera.lookAt(scene.position);
	
  scene.add(camera);
  scene.add(spotLight);
  scene.add(ambientLight);
  scene.add(hemiLight);
  scene.add(bgPlane);
  return { scene, camera };
}

export default Scene;