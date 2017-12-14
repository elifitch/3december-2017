import * as THREE from 'three';
import 'three/LoaderSupport';
import 'three/OBJLoader2';
import 'three/MTLLoader';
import donutObj from '../models/low-poly-donut.obj';
import donutMtl from '../models/low-poly-donut.mtl';

function ExampleCube() {
  const loadingMgr = new THREE.LoadingManager();
  const objLoader = new THREE.OBJLoader2(loadingMgr);
  objLoader.crossOrigin = '';

  return new Promise(resolve => {
    // objLoader.load(url, onLoad, onProgress, onError, onMeshAlter, useAsync)
    // objLoader.loadMtl(url, name, content, callbackOnLoad, crossOrigin)
    const onLoaderProgress = prog => console.log('proggy: ', prog);
    const onLoaderError = err => console.error(err);
    const onLoadMtl = materials => {
      objLoader.setMaterials(materials);
      objLoader.setUseIndices(true);
      loadObj();
    };
    const onObjLoad = loaderEvent => {
      const obj = loaderEvent.detail.loaderRootNode;
      obj.rotation.set(0, 0, Math.PI*1.5)
      resolve(obj);
    };
    const loadObj = () => objLoader.load(donutObj, onObjLoad, onLoaderProgress, onLoaderError);
    objLoader.loadMtl(donutMtl, 'low-poly-donut.mtl', null, onLoadMtl, 'anonymous')
  });
}

export default ExampleCube;
