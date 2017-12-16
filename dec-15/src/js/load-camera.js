import * as THREE from 'three';
import 'three/LoaderSupport';
import 'three/OBJLoader2';
import 'three/MTLLoader';
import camObj from '../models/low-poly-security-camera.obj';
import camMtl from '../models/low-poly-security-camera.mtl';

function LoadCamera() {
  const loadingMgr = new THREE.LoadingManager();
  const objLoader = new THREE.OBJLoader2(loadingMgr);
  objLoader.crossOrigin = '';

  return new Promise(resolve => {
    // objLoader.load(url, onLoad, onProgress, onError, onMeshAlter, useAsync)
    // objLoader.loadMtl(url, name, content, callbackOnLoad, crossOrigin)
    const onLoaderProgress = prog => console.log('proggy: ', prog);
    const onLoaderError = err => console.error(err);
    const onLoadMtl = materials => {
      materials.metal = new THREE.MeshLambertMaterial({
        color: '#979797'
      });
      materials.glass = new THREE.MeshPhongMaterial({
        color: '#000000',
        specular: '#111111',
        shininess: 100
      })
      objLoader.setMaterials(materials);
      objLoader.setUseIndices(true);
      loadObj();
    };
    const onObjLoad = loaderEvent => {
      const obj = loaderEvent.detail.loaderRootNode;
      obj.children[0].castShadow = true;
      obj.children[1].castShadow = true;
      obj.children[0].position.set(0, 2.7, 3.1)
      resolve(obj);
    };
    const loadObj = () => objLoader.load(camObj, onObjLoad);
    objLoader.loadMtl(camMtl, 'low-poly-security-camera.mtl', null, onLoadMtl, 'anonymous')
  });
}

export default LoadCamera;
