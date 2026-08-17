/* Deterministic Russian viseme normalization. Canonical IDs match v13 runtime. */
(function(){
  'use strict';
  const map={
    'а':'aa','я':'aa','о':'ao','ё':'ao','у':'u','ю':'u','э':'e','е':'e','и':'i','ы':'y',
    'м':'bpm','б':'bpm','п':'bpm','ф':'fv','в':'fv','л':'l','р':'r','т':'td','д':'td',
    'к':'kg','г':'kg','с':'sz','з':'sz','ц':'sz','ш':'shzh','ж':'shzh','ч':'ch','щ':'shzh',
    'й':'j','н':'n','х':'h'
  };
  function normalize(input){
    const text=String(input||'').toLowerCase();
    return Array.from(text).map(ch=>({char:ch,viseme:map[ch]||'sil'}));
  }
  function timeline(input,durationMs){
    const chars=normalize(input).filter(x=>x.viseme!=='sil');
    if(!chars.length)return [];
    const total=Math.max(1,Number(durationMs)||chars.length*70);
    const step=total/chars.length;
    return chars.map((x,i)=>({v:x.viseme,t:Math.round(i*step/1000),w:1,char:x.char,startMs:Math.round(i*step),endMs:Math.round((i+1)*step)}));
  }
  window.SvetlanaRussianVisemes={version:'13.2.0',normalize,timeline};
})();
