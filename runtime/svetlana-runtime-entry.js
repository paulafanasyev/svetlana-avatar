/* Single runtime entrypoint */
(function(){
  'use strict';
  const required=['SvetlanaAvatarRuntime','SvetlanaStateMachine','SvetlanaRealtimeController','SvetlanaHost','SvetlanaTTSAdapter'];
  function status(){return Object.fromEntries(required.map(k=>[k,!!window[k]]));}
  function assertReady(){const s=status();const missing=required.filter(k=>!s[k]);if(missing.length)throw new Error('svetlana_runtime_missing:'+missing.join(','));return s;}
  window.SvetlanaRuntime={version:'13.0.0',status,assertReady};
})();
