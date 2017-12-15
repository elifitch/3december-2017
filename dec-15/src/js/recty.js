import * as THREE from 'three';
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

function makeRecties(numX, numY) {
  // https://stackoverflow.com/questions/32848707/three-js-arranging-cubes-in-a-grid
  const hCount = numX;
  const vCount = numY;
  const spacing = 0.75;
  const grid = new THREE.Object3D();

  for (let h = 0; h < hCount; h += 1) {
    for (let v = 0; v < vCount; v += 1) {
      const box = Recty();
      box.position.x = ((h - hCount / 2) * spacing) + (spacing / 2);
      box.position.y = ((v - vCount / 2) * spacing) + (spacing / 2);
      grid.add(box);
    }
  }
  return grid;
}

export default makeRecties;
