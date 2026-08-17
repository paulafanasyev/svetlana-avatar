const fs=require('fs'), assert=require('assert');
const manifest=JSON.parse(fs.readFileSync('assets/model/GLB_VERIFIED.json','utf8'));
const expected=['blink_L','blink_R','browUp_L','browUp_R','jawOpen','mouthOpen','mouthSmile_L','mouthSmile_R','mouthPucker','mouthFunnel','mouthClose'];
assert.strictEqual(manifest.morph_target_count,expected.length);
assert.deepStrictEqual(manifest.morph_targets,expected);
assert.strictEqual(manifest.animations,0);
assert.strictEqual(manifest.skins,0);
console.log('Svetlana model/morph contract: PASS');
