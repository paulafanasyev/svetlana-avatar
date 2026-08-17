/* Svetlana realtime state machine */
(function(){
  'use strict';
  const STATES=Object.freeze(['idle','listening','thinking','speaking','interrupted','error']);
  const allowed={idle:new Set(['listening','thinking','speaking']),listening:new Set(['thinking','idle','interrupted','error']),thinking:new Set(['speaking','idle','interrupted','error']),speaking:new Set(['idle','listening','thinking','interrupted','error']),interrupted:new Set(['idle','listening','thinking']),error:new Set(['idle','listening'])};
  let state='idle', seq=0;
  const listeners=new Set();
  function transition(next,meta={}){
    if(!STATES.includes(next))throw new Error('invalid_state');
    if(next!==state&&!allowed[state].has(next))throw new Error(`invalid_transition:${state}->${next}`);
    const prev=state;state=next;const event={id:++seq,from:prev,to:next,time:Date.now(),meta};listeners.forEach(fn=>{try{fn(event)}catch(_){}});return event;
  }
  function on(fn){if(typeof fn!=='function')throw new Error('invalid_listener');listeners.add(fn);return()=>listeners.delete(fn)}
  window.SvetlanaStateMachine={STATES,get:()=>state,transition,on};
})();
