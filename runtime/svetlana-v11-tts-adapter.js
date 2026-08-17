/* Svetlana Avatar v11 — AI/TTS adapter
 * Provider keys must remain outside the browser.
 */
(function(){
  'use strict';
  const VERSION='11.0.0';
  const providers=new Map();
  function register(name, provider){
    if(!name || !provider || typeof provider.synthesize!=='function') throw new Error('invalid_provider');
    providers.set(String(name), provider);
  }
  async function synthesize(req){
    const name=String(req?.provider||'default');
    const provider=providers.get(name);
    if(!provider) throw new Error('tts_provider_not_registered:'+name);
    const result=await provider.synthesize({
      text:String(req?.text||''), voice:req?.voice||null,
      locale:req?.locale||'ru-RU', signal:req?.signal
    });
    if(!result || (!result.audioUrl && !result.audioBlob)) throw new Error('tts_provider_returned_no_audio');
    return {...result,provider:name};
  }
  function normalizeAI(response){
    return {
      text:String(response?.text||''),
      emotion:String(response?.emotion||'neutral'),
      phonemes:Array.isArray(response?.phonemes)?response.phonemes:[],
      metadata:(response?.metadata&&typeof response.metadata==='object')?response.metadata:{}
    };
  }
  async function speak(response,opts={}){
    const ai=normalizeAI(response);
    const tts=await synthesize({provider:opts.provider||'default',text:ai.text,voice:opts.voice,locale:opts.locale||'ru-RU',signal:opts.signal});
    return window.SvetlanaBridge.enqueue({
      id:opts.id||`turn-${Date.now()}`, text:ai.text, emotion:ai.emotion,
      phonemes:ai.phonemes, metadata:ai.metadata,
      tts:{audioUrl:tts.audioUrl||null,audioBlob:tts.audioBlob||null,phonemes:ai.phonemes,emotion:ai.emotion}
    });
  }
  window.SvetlanaTTSAdapter={version:VERSION,register,synthesize,speak};
})();
