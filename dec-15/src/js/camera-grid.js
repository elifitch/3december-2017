import * as THREE from 'three';
import LoadCamera from './load-camera';

const objSize = {
  x: 0.25,
  y: 0.25,
  z: 1
};

function Recty() {
  const geo = new THREE.BoxGeometry(...Object.values(objSize));
  const material = new THREE.MeshLambertMaterial({
    color: 0xFF00FF
  });
  const rect = new THREE.Mesh(geo, material);
  rect.castShadow = true;
  return rect;
}

function MakeGrid(numX, numY) {
  // https://stackoverflow.com/questions/32848707/three-js-arranging-cubes-in-a-grid
  const hCount = numX;
  const vCount = numY;
  const hSpacing = 10;
  const vSpacing = 10;
  const grid = new THREE.Object3D();

  for (let h = 0; h < hCount; h += 1) {
    for (let v = 0; v < vCount; v += 1) {
      LoadCamera().then(cam => {
        cam.position.x = ((h - hCount / 2) * hSpacing) + (hSpacing / 2);
        cam.position.y = ((v - vCount / 2) * vSpacing) + (vSpacing / 2);
        grid.add(cam);
      });
    }
  }
  return grid;
}

export default MakeGrid;
