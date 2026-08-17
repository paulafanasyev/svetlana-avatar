import {detectWebGL,markCapability} from './webgl-capability.js';
export function initRuntimeGate(canvas,status){
  const cap=detectWebGL(canvas);markCapability(status,cap);
  if(!cap.ok){document.documentElement.dataset.svetlanaReady='false';throw new Error('WEBGL_UNAVAILABLE');}
  document.documentElement.dataset.svetlanaReady='true';
  return cap;
}
