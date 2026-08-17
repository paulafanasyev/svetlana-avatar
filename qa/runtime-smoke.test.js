/* Deterministic smoke tests for the Svetlana runtime. Run with Node after loading runtime files. */
const fs=require('fs'), vm=require('vm'), assert=require('assert');
const files=['runtime/svetlana-v13-runtime.js','runtime/svetlana-state-machine.js'];
const context={console,performance:{now:()=>0},window:{},document:{},CustomEvent:function(type,init){this.type=type;this.detail=init.detail}};
context.globalThis=context; vm.createContext(context);
for(const f of files) vm.runInContext(fs.readFileSync(f,'utf8'),context,{filename:f});
const R=context.window.SvetlanaAvatarRuntime;
assert(R && R.version==='13.0.0');
assert.deepStrictEqual(R.pose('aa',1),{jawOpen:0.6,mouthOpen:0.72});
assert(R.sample([{t:0,v:'aa'},{t:1,v:'i'}],0.5).jawOpen>0);
assert(R.emotion('smile',1).smile>0);
const S=context.window.SvetlanaStateMachine;
assert(S.get()==='idle');
S.transition('thinking'); S.transition('speaking'); S.transition('interrupted'); S.transition('idle');
assert(S.get()==='idle');
console.log('Svetlana runtime smoke: PASS');
