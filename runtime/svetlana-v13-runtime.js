/* Svetlana Avatar v13 — deterministic viseme/morph runtime contract */
(function(){
  'use strict';
  const VERSION='13.0.0';
  const VIS={
    SIL:'sil',AA:'aa',AO:'ao',E:'e',I:'i',O:'o',U:'u',Y:'y',AE:'ae',
    B_P_M:'bpm',F_V:'fv',K_G:'kg',T_D:'td',S_Z:'sz',SH_ZH:'shzh',CH:'ch',J:'j',R:'r',L:'l',N:'n',H:'h',TH:'th'
  };
  const CAPS={jawOpen:.72,mouthOpen:.82,smile:.72,pucker:.68,funnel:.65,brow:.55,blink:1};
  const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,Number(x)||0));
  const morphMap={
    sil:{},aa:{jawOpen:.60,mouthOpen:.72},ao:{jawOpen:.48,mouthOpen:.55},e:{jawOpen:.30,smile:.18},i:{jawOpen:.18,smile:.28},o:{jawOpen:.34,mouthOpen:.42,pucker:.45},u:{jawOpen:.22,pucker:.62},y:{jawOpen:.24,smile:.20},ae:{jawOpen:.52,mouthOpen:.58},
    bpm:{mouthOpen:.02},fv:{mouthOpen:.18},kg:{jawOpen:.28},td:{jawOpen:.18},sz:{mouthOpen:.20,smile:.10},shzh:{mouthOpen:.25,pucker:.22},ch:{mouthOpen:.28,pucker:.16},j:{mouthOpen:.18,pucker:.10},r:{jawOpen:.20},l:{jawOpen:.22},n:{mouthOpen:.10},h:{jawOpen:.22},th:{mouthOpen:.18}
  };
  function pose(viseme,weight=1){
    const base=morphMap[viseme]||morphMap.sil, out={};
    for(const [k,v] of Object.entries(base)) out[k]=clamp(v*clamp(weight),0,CAPS[k]??1);
    return out;
  }
  function sample(timeline,time){
    if(!Array.isArray(timeline)||!timeline.length)return pose(VIS.SIL,1);
    let current=timeline[0], next=null;
    for(let i=0;i<timeline.length;i++){
      if(time>=Number(timeline[i].t||0)) current=timeline[i];
      if(i+1<timeline.length && time<Number(timeline[i+1].t||0)){next=timeline[i+1];break;}
    }
    const a=pose(current.v||VIS.SIL,current.w??1);
    if(!next)return a;
    const t0=Number(current.t||0),t1=Number(next.t||t0),u=t1>t0?clamp((time-t0)/(t1-t0)):1;
    const b=pose(next.v||VIS.SIL,next.w??1),out={...a};
    for(const k of new Set([...Object.keys(a),...Object.keys(b)])) out[k]=(a[k]||0)+(b[k]||0-(a[k]||0))*u;
    return out;
  }
  function emotion(name,intensity=1){
    const i=clamp(intensity), n=String(name||'neutral').toLowerCase();
    if(n==='smile')return {smile:.65*i,brow:.08*i};
    if(n==='surprise')return {brow:.48*i,jawOpen:.25*i};
    if(n==='sad')return {smile:-.22*i,brow:-.18*i};
    if(n==='angry')return {brow:-.45*i,jawOpen:.08*i};
    if(n==='thinking')return {brow:.18*i,smile:.06*i};
    return {};
  }
  function merge(base,overlay){const o={...base};for(const[k,v]of Object.entries(overlay||{}))o[k]=clamp((o[k]||0)+v,0,CAPS[k]??1);return o;}
  window.SvetlanaAvatarRuntime={version:VERSION,VIS,CAPS,pose,sample,emotion,merge};
})();
