import {loadLocalGLB,inspectGLB} from './model-loader.js';
const REQUIRED=['blink_L','blink_R','browUp_L','browUp_R','jawOpen','mouthOpen','mouthSmile_L','mouthSmile_R','mouthPucker','mouthFunnel','mouthClose'];
export async function verifyModel(url){const glb=await loadLocalGLB(url);const info=inspectGLB(glb);if(info.scenes<1||info.meshes<1)throw new Error('model_scene_or_mesh_missing');return {ok:true,info,requiredMorphs:REQUIRED};}
window.SvetlanaModelContract={requiredMorphs:REQUIRED,verifyModel};
