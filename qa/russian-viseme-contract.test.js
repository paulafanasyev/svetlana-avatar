const fs=require('fs'),vm=require('vm'),assert=require('assert');
const c={window:{}};c.globalThis=c;vm.createContext(c);
vm.runInContext(fs.readFileSync('runtime/russian-visemes.js','utf8'),c);
vm.runInContext(fs.readFileSync('runtime/svetlana-v13-runtime.js','utf8'),c);
const v=c.window.SvetlanaRussianVisemes;
const r=c.window.SvetlanaAvatarRuntime;
const ids=new Set(Object.values(r.VIS));
for(const x of v.normalize('Привет, Светлана!')) assert(ids.has(x.viseme),'unknown viseme: '+x.viseme);
const tl=v.timeline('Привет Светлана',1000);
assert(tl.length>0);
for(const x of tl){assert(typeof x.t==='number');assert(ids.has(x.v));}
console.log('Russian viseme contract: PASS');
