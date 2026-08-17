export async function runVisualSmoke(avatar){
  const expected=['blink_L','blink_R','browUp_L','browUp_R','jawOpen','mouthOpen','mouthSmile_L','mouthSmile_R','mouthPucker','mouthFunnel','mouthClose'];
  const available=new Set(avatar.morphs.flatMap(m=>Object.keys(m.dictionary)));
  const missing=expected.filter(x=>!available.has(x));
  if(missing.length)throw new Error('missing_morphs:'+missing.join(','));
  avatar.setMorph('mouthSmile_L',0.35);avatar.setMorph('mouthSmile_R',0.35);avatar.setMorph('jawOpen',0.15);
  await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
  return {ok:true,morphs:expected};
}
