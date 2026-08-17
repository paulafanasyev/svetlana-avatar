/* Minimal GLB inspector/loader foundation. No CDN, no remote code. */
export async function loadLocalGLB(url){
  const r=await fetch(url,{credentials:'same-origin'});
  if(!r.ok)throw new Error(`glb_fetch_failed:${r.status}`);
  const b=await r.arrayBuffer(); const v=new DataView(b);
  if(v.byteLength<20)throw new Error('glb_too_small');
  if(v.getUint32(0,true)!==0x46546c67)throw new Error('not_glb');
  const version=v.getUint32(4,true), length=v.getUint32(8,true);
  if(version!==2||length!==v.byteLength)throw new Error('invalid_glb_header');
  return {buffer:b,version,length};
}
export function inspectGLB(glb){
  const v=new DataView(glb.buffer), jsonLength=v.getUint32(12,true), jsonType=v.getUint32(16,true);
  if(jsonType!==0x4e4f534a)throw new Error('missing_json_chunk');
  const bytes=new Uint8Array(glb.buffer,20,jsonLength);
  const json=JSON.parse(new TextDecoder().decode(bytes));
  return {asset:json.asset||{},scenes:(json.scenes||[]).length,nodes:(json.nodes||[]).length,meshes:(json.meshes||[]).length,materials:(json.materials||[]).length,animations:(json.animations||[]).length,skins:(json.skins||[]).length};
}
