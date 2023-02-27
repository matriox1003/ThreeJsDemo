const initShader = (gl: WebGLRenderingContext, vsSource: string, fsSource: string) => {
  const program = gl.createProgram();
  if (program == null) return false;

  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  if(vertexShader == null || fragmentShader == null) return false;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);
  return program;
}

const loadShader = (gl: WebGLRenderingContext, type: GLenum, source: string) => {
  const shader = gl.createShader(type);
  if(shader == null) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

export {
  initShader
}