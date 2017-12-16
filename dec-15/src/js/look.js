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
  intersectPoint.setZ(25);

  container.children.forEach(child => {
    const cam = child.children[0];
    const distanceFactor = cam.position.distanceTo(intersectPoint);
    const lookVector = new THREE.Vector3(
      intersectPoint.x,
      intersectPoint.y,
      intersectPoint.z
    )
    child.children[0].lookAt(worldToLocal(lookVector, cam));
  });
}

const worldToLocal = (vector, obj) => {

  var objRotationMatrix = new THREE.Matrix4().extractRotation(obj.parent.matrixWorld);

  var objTranslationMatrix = new THREE.Matrix4().extractPosition(obj.parent.matrixWorld);
  var mat = new THREE.Matrix4().multiply(objTranslationMatrix, objRotationMatrix);
  var inv = new THREE.Matrix4().getInverse(mat);

  var world = new THREE.Vector4(vector.x, vector.y, vector.z, 1);
  inv.multiplyVector4(world);

  return new THREE.Vector3(world.x, world.y, world.z);
}

export default Look;