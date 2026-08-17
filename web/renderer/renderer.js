const canvas=document.querySelector('#viewport');
const status=document.querySelector('#status');
function resize(){const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.max(1,canvas.clientWidth*dpr);canvas.height=Math.max(1,canvas.clientHeight*dpr)}
addEventListener('resize',resize);resize();
const gl=canvas.getContext('webgl2',{antialias:true,alpha:false});
if(!gl){status.textContent='WebGL2 unavailable';throw new Error('WebGL2 unavailable')}
status.textContent='WebGL2 available — model loader pending binary asset';
const vs=`#version 300 es\nin vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
const fs=`#version 300 es\nprecision highp float;out vec4 c;void main(){vec2 q=gl_FragCoord.xy/vec2(${canvas.width.toFixed(1)},${canvas.height.toFixed(1)});c=vec4(.055+.04*q.y,.065+.05*q.x,.11+.08*q.y,1.);}`;
function shader(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s}
const prog=gl.createProgram();gl.attachShader(prog,shader(gl.VERTEX_SHADER,vs));gl.attachShader(prog,shader(gl.FRAGMENT_SHADER,fs));gl.linkProgram(prog);if(!gl.getProgramParameter(prog,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(prog));
const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);gl.useProgram(prog);const loc=gl.getAttribLocation(prog,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
function frame(){resize();gl.viewport(0,0,canvas.width,canvas.height);gl.drawArrays(gl.TRIANGLES,0,3);requestAnimationFrame(frame)}
frame();
window.SvetlanaRenderer={version:'0.1.0',gl,canvas,ready:true};
