import * as THREE from 'three';
import 'three/LoaderSupport';
import 'three/OBJLoader2';
import 'three/MTLLoader';
import ftfObj from '../models/ftf-pod2.obj';
import ftfMtl from '../models/ftf-pod2.mtl';

function ImportModel({ fragmentShader }) {
  const loadingMgr = new THREE.LoadingManager();
  const objLoader = new THREE.OBJLoader2(loadingMgr);
  objLoader.crossOrigin = '';

  return new Promise(resolve => {
    // objLoader.load(url, onLoad, onProgress, onError, onMeshAlter, useAsync)
    // objLoader.loadMtl(url, name, content, callbackOnLoad, crossOrigin)
    const onLoaderProgress = prog => null;
    const onLoaderError = err => console.error(err);
    const onLoadMtl = materials => {
      // these materials will be overridden by a shader example
      const adjustedMaterials = Object.keys(materials)
        .reduce((adjMatls, key) => {
          if (key.startsWith('sprinkle')) {
            adjMatls[key] = new THREE.MeshBasicMaterial({
              color: materials[key].color
            })
          } else {
            adjMatls[key] = materials[key]
          }
          return adjMatls
        }, {})
      adjustedMaterials.gray = new THREE.MeshBasicMaterial({
        color: '#ccc'
      })
      adjustedMaterials.white = new THREE.MeshBasicMaterial({
        color: '#FFFFFF'
      })
      objLoader.setMaterials(adjustedMaterials);
      objLoader.setUseIndices(true);
      loadObj();
    };
    const onObjLoad = loaderEvent => {
      const meshGroup = loaderEvent.detail.loaderRootNode;
      const thing = meshGroup.children[0];
      resolve(meshGroup);
    };
    const loadObj = () => objLoader.load(ftfObj, onObjLoad, onLoaderProgress, onLoaderError);
    objLoader.loadMtl(ftfMtl, 'ftf-pod.mtl', null, onLoadMtl, 'anonymous')
  });
}

export default ImportModel;
