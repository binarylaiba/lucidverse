import { useEffect, useRef } from 'react';

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    let animId: number;
    let isMounted = true;

    function syncSize() {
      if (!canvas) return;
      const w = window.innerWidth || 1280;
      const h = window.innerHeight || 800;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }
    syncSize();

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
    vec2 uv = v_texCoord;
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 normMouse = (u_mouse / u_resolution - 0.5) * 0.12;
    
    // Deep midnight base
    vec3 color = vec3(0.008, 0.015, 0.035);
    
    // Volumetric nebula clouds
    float t = u_time * 0.035;
    float n1 = snoise(uv * 1.6 + vec2(t * 0.25, t * 0.15) + normMouse);
    float n2 = snoise(uv * 3.2 - vec2(t * 0.35, t * 0.08));
    float n3 = snoise(uv * 5.5 + vec2(t * 0.18, -t * 0.25));
    
    vec3 violet = vec3(0.32, 0.14, 0.55) * 0.42;
    vec3 indigo = vec3(0.14, 0.18, 0.48) * 0.48;
    vec3 cyan = vec3(0.04, 0.58, 0.68) * 0.32;
    
    color += violet * smoothstep(0.05, 0.75, n1);
    color += indigo * smoothstep(0.15, 0.85, n2);
    color += cyan * smoothstep(0.3, 0.95, n3) * 0.35;
    
    // Celestial Moon
    vec2 moonPos = vec2(0.38, 0.42) + normMouse * 0.4;
    float dMoon = length(p - moonPos);
    
    float moonCore = smoothstep(0.20, 0.19, dMoon);
    float moonCorona = exp(-dMoon * 2.8) * 0.6;
    float moonAura = exp(-dMoon * 1.1) * 0.22;
    
    float craterNoise = snoise(p * 12.0) * 0.07 + snoise(p * 24.0) * 0.03;
    vec3 moonColor = vec3(0.9, 0.94, 1.0) * (1.0 - craterNoise);
    
    color += moonColor * moonCore * 0.8;
    color += vec3(0.75, 0.85, 1.0) * moonCorona;
    color += vec3(0.55, 0.45, 0.95) * moonAura;
    
    // Starfield
    vec2 starUV = uv * 24.0;
    float starSeed = fract(sin(dot(floor(starUV), vec2(12.9898, 78.233))) * 43758.5453);
    if (starSeed > 0.965) {
        float starIntensity = fract(starSeed * 100.0);
        float twinkle = 0.5 + 0.5 * sin(u_time * 2.2 + starSeed * 6.28);
        vec2 starOffset = fract(starUV) - 0.5;
        float starDist = length(starOffset);
        float starGlow = smoothstep(0.12, 0.0, starDist) * twinkle * starIntensity;
        color += vec3(0.92, 0.96, 1.0) * starGlow * 1.4;
    }
    
    // Bottom Fog
    float bottomFog = smoothstep(0.42, 0.0, uv.y);
    vec3 fogColor = vec3(0.03, 0.06, 0.15) + cyan * 0.25;
    color = mix(color, fogColor, bottomFog * 0.8);

    gl_FragColor = vec4(color, 1.0);
}`;

    function createShader(context: WebGLRenderingContext, type: number, src: string) {
      const s = context.createShader(type);
      if (!s) return null;
      context.shaderSource(s, src);
      context.compileShader(s);
      return s;
    }

    const prog = gl.createProgram();
    if (!prog) return;

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vs);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fs);
    if (!vertShader || !fragShader) return;

    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', syncSize, { passive: true });

    function render(t: number) {
      if (!isMounted || !canvas || !gl) return;
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    }

    render(0);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', syncSize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block opacity-75" />
    </div>
  );
}
