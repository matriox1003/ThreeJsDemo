/*
 * @Author: jinhaojie
 * @Date: 2022-09-12 16:35:09
 * @LastEditTime: 2023-01-28 14:02:24
 * @LastEditors: jinhaojie
 * @Description: 
 * @FilePath: \webgl_test\src\pages\Vertex\index.tsx
 * 为什么我的眼里常含泪水, 因为我对这土地爱得深沉!
 */

import { useMount, useSafeState } from "ahooks";

import  {initShader}  from '@/utils/utils';

export default function Vertex() {

  const [ gl, setGl ] = useSafeState<WebGLRenderingContext | null>(null);
  const [ program, setProgram ] = useSafeState<WebGLProgram | null>(null);

  const [ vsSource, setVsSource ] = useSafeState<string>(`
    void main() {
      gl_Position = vec4(0, 0, 0, 1);
      gl_PointSize = 100.0;
    }
  `);

  const [ fsSource, setFsSource ] = useSafeState<string>(`
    void main() {
      gl_FragColor = vec4(1, 1, 0, 1);
    }
  `);


  // 初始化
  useMount(() => {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;

    if(canvas != null) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const gl = canvas.getContext('webgl');

      if (gl == null) {
        console.log('您的浏览器不支持webgl');
        return;
      }
      
      const program = initShader(gl, vsSource, fsSource);

      if(program == null) return;

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      setGl(gl);
      setProgram(program);

      gl.drawArrays(gl.POINTS, 0, 1);
    }
    
  });

  return (
    <canvas id="canvas"></canvas>
  )
}
