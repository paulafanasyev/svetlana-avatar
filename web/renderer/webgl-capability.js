export function detectWebGL(canvas){
  const gl2=canvas.getContext('webgl2',{antialias:true,alpha:false,preserveDrawingBuffer:true});
  if(gl2)return {ok:true,kind:'webgl2',gl:gl2};
  const gl=canvas.getContext('webgl',{antialias:true,alpha:false,preserveDrawingBuffer:true});
  if(gl)return {ok:true,kind:'webgl1',gl};
  return {ok:false,kind:'none',gl:null};
}
export function markCapability(el,cap){
  el.dataset.webgl=cap.kind;el.dataset.webglReady=String(cap.ok);
  el.textContent=cap.ok?`WebGL ready (${cap.kind})`:'WebGL unavailable';
}
