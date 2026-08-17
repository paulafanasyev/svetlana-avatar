import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

export async function createSvetlanaRenderer(canvas, modelUrl){
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,preserveDrawingBuffer:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));
  renderer.setSize(canvas.clientWidth||800,canvas.clientHeight||600,false);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  const scene=new THREE.Scene(); scene.background=new THREE.Color(0x0b0d14);
  const camera=new THREE.PerspectiveCamera(30,canvas.clientWidth/canvas.clientHeight,.01,100); camera.position.set(0,0.15,2.7);
  scene.add(new THREE.HemisphereLight(0xffffff,0x303040,1.8));
  const key=new THREE.DirectionalLight(0xffffff,2.2); key.position.set(1.5,2,3); scene.add(key);
  const loader=new GLTFLoader();
  const gltf=await loader.loadAsync(modelUrl);
  const root=gltf.scene; scene.add(root);
  const box=new THREE.Box3().setFromObject(root); const center=box.getCenter(new THREE.Vector3()); const size=box.getSize(new THREE.Vector3());
  root.position.sub(center); camera.position.z=Math.max(1.2,size.y*2.3); camera.lookAt(0,0,0);
  const morphs=[];
  root.traverse(o=>{if(o.isMesh&&o.morphTargetDictionary){morphs.push({mesh:o,dictionary:o.morphTargetDictionary,influences:o.morphTargetInfluences});}});
  function setMorph(name,value){for(const m of morphs){const i=m.dictionary[name];if(i!==undefined)m.influences[i]=Math.max(0,Math.min(1,value));}}
  function resize(){const w=canvas.clientWidth||800,h=canvas.clientHeight||600;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}
  function frame(){resize();renderer.render(scene,camera);requestAnimationFrame(frame)} frame();
  return {renderer,scene,camera,root,morphs,setMorph,gltf};
}
