// https://stackoverflow.com/questions/44823986/how-to-rotate-object-to-look-mouse-point-in-three-js
import * as THREE from 'three';

const rayCaster = new THREE.Raycaster();
const intersectPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const intersectPoint = new THREE.Vector3();

function Look(container, mouseX, mouseY, camera) {
  const normalizedMouse = {
    x: (mouseX / window.innerWidth) * 2 - 1,
    y: - (mouseY / window.innerHeight) * 2 + 1
  }
  rayCaster.setFromCamera(normalizedMouse, camera);
  rayCaster.ray.intersectPlane(intersectPlane, intersectPoint);
  intersectPoint.setZ(3);

  container.children.forEach(child => {
    child.lookAt(intersectPoint);
  });
}

export default Look;