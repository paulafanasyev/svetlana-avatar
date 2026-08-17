/* Deterministic Russian viseme normalization. No network. */
(function(){
  'use strict';
  const map={
    'а':'A','я':'A','о':'O','ё':'O','у':'U','ю':'U','э':'E','е':'E','и':'I','ы':'I',
    'м':'MBP','б':'MBP','п':'MBP','ф':'FV','в':'FV','л':'L','р':'R','т':'TD','д':'TD',
    'к':'KG','г':'KG','с':'SZ','з':'SZ','ц':'SZ','ш':'SH','ж':'SH','ч':'SH','щ':'SH',
    'й':'J','н':'N'
  };
  function normalize(input){
    const text=String(input||'').toLowerCase();
    return Array.from(text).map(ch=>({char:ch,viseme:map[ch]||'silence'}));
  }
  function timeline(input, durationMs){
    const chars=normalize(input).filter(x=>x.viseme!=='silence');
    if(!chars.length)return [];
    const total=Math.max(1,Number(durationMs)||chars.length*70);
    const step=total/chars.length;
    return chars.map((x,i)=>({viseme:x.viseme,startMs:Math.round(i*step),endMs:Math.round((i+1)*step),char:x.char}));
  }
  window.SvetlanaRussianVisemes={version:'13.1.0',normalize,timeline};
})();
