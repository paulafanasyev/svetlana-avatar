/* Browser loader: one controlled entrypoint, no remote script injection. */
(function(){
  'use strict';
  const ORDER=[
    'runtime/russian-visemes.js',
    'runtime/svetlana-v13-runtime.js',
    'runtime/svetlana-state-machine.js',
    'runtime/svetlana-realtime-controller.js',
    'runtime/svetlana-v11-tts-adapter.js',
    'runtime/svetlana-v10-host.js',
    'runtime/svetlana-runtime-entry.js'
  ];
  function load(base=location.href){
    return ORDER.reduce((p,path)=>p.then(()=>new Promise((resolve,reject)=>{
      const s=document.createElement('script');s.src=new URL(path,base).href;s.async=false;
      s.onload=resolve;s.onerror=()=>reject(new Error('svetlana_script_load_failed:'+path));
      document.head.appendChild(s);
    })),Promise.resolve()).then(()=>window.SvetlanaRuntime.assertReady());
  }
  window.SvetlanaLoader={version:'13.2.0',order:ORDER.slice(),load};
})();
