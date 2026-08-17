/* Svetlana realtime controller: speech + visemes + emotion + gaze + blink */
(function(){
  'use strict';
  let active=null, raf=0, lastBlink=performance.now()+2500;
  const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,Number(x)||0));
  function cancel(reason='user'){
    if(active?.abort)active.abort.abort();
    active=null;
    try{window.SvetlanaStateMachine?.transition('interrupted',{reason})}catch(_){}
    try{window.SvetlanaBridge?.interrupt?.(reason)}catch(_){}
  }
  async function speak(turn,opts={}){
    cancel('new-turn');
    const abort=new AbortController(); active={abort};
    try{
      window.SvetlanaStateMachine?.transition('speaking',{id:turn?.id});
      const timeline=Array.isArray(turn?.phonemes)?turn.phonemes:[];
      const started=performance.now();
      const frame=()=>{
        if(!active)return;
        const t=(performance.now()-started)/1000;
        const vis=window.SvetlanaAvatarRuntime?.sample(timeline,t)||{};
        const emotion=window.SvetlanaAvatarRuntime?.emotion(turn?.emotion||'neutral',opts.emotionIntensity??1)||{};
        const blink=(performance.now()-lastBlink>opts.blinkEveryMs||3000)?0:1;
        if(blink===0)lastBlink=performance.now()+Math.random()*1800;
        const pose=window.SvetlanaAvatarRuntime?.merge(vis,emotion)||vis;
        try{window.SvetlanaBridge?.applyMorphs?.({...pose,blink});}catch(_){}
        raf=requestAnimationFrame(frame);
      };
      cancelAnimationFrame(raf); raf=requestAnimationFrame(frame);
      if(window.SvetlanaBridge?.enqueue) await window.SvetlanaBridge.enqueue({...turn,signal:abort.signal});
      else throw new Error('bridge_enqueue_missing');
      if(active?.abort===abort){active=null;window.SvetlanaStateMachine?.transition('idle',{id:turn?.id});}
    }catch(e){
      if(e?.name==='AbortError')return;
      active=null;try{window.SvetlanaStateMachine?.transition('error',{error:String(e?.message||e)})}catch(_){}
      throw e;
    }finally{cancelAnimationFrame(raf)}
  }
  function lookAt(x,y){
    try{window.SvetlanaBridge?.lookAt?.(clamp(x,-1,1),clamp(y,-1,1))}catch(_){}
  }
  window.SvetlanaRealtimeController={speak,cancel,lookAt};
})();
