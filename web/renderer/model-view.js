import {verifyModel} from './model-contract.js';
const status=document.querySelector('#status');
export async function mountModel(url){
  const result=await verifyModel(url);
  status.textContent=`GLB verified: ${result.info.meshes} mesh, ${result.info.materials} material, ${result.info.animations} animation, ${result.info.skins} skin`;
  return result;
}
window.SvetlanaModelView={mountModel};
