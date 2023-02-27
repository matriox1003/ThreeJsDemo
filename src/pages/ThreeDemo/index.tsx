/*
 * @Author: jinhaojie
 * @Date: 2023-01-28 14:04:19
 * @LastEditTime: 2023-02-27 10:48:57
 * @LastEditors: jinhaojie
 * @Description: ThreeJS Demo
 * @FilePath: \webgl_test\src\pages\ThreeDemo\index.tsx
 * 为什么我的眼里常含泪水, 因为我对这土地爱得深沉!
 */
import { useMount } from "ahooks";
import React, { MutableRefObject, useEffect, useRef } from "react";
import * as THREE from 'three';
import dat from 'dat.gui';

// ThreeJs Loaders
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

import marbleMap from '@/assets/textures/marble/map.jpg';

// 模型
import bowlModel from '@/assets/models/bowl.glb';
import shuicijiModel from '@/assets/models/shuiciji.svg';
import reserveBoxModel from '@/assets/models/Reserve_Box.glb';

// 天空纹理
import skyHdrTexture from '@/assets/textures/hdr/sky.hdr';

// 草地贴图
import grassAoMap from '@/assets/textures/grass/grass_ao.png';
import grassBumpMap from '@/assets/textures/grass/grass_bump.png';
import grassNormalMap from '@/assets/textures/grass/grass_normal.png';
import grassSpecularMap from '@/assets/textures/grass/grass_specular.png';
import grassDisplayMap from '@/assets/textures/grass/grass_display.png';
import grassRoughMap from '@/assets/textures/grass/grass_rough.png';
import grassDiffuseMap from '@/assets/textures/grass/grass_diffuse.png';
import { MeshBasicMaterial } from "three";

const gui = new dat.GUI();

const clock = new THREE.Clock();

const ThreeDemo: React.FC = () => {
  const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null);
  const rendererRef: MutableRefObject<THREE.WebGLRenderer | null> = useRef(null);
  const sceneRef: MutableRefObject<THREE.Scene | null> = useRef(null);
  const cameraRef: MutableRefObject<THREE.PerspectiveCamera | null> = useRef(null);
  const controlsRef: MutableRefObject<OrbitControls | null> = useRef(null);

  const render = () => {
      requestAnimationFrame(render);
      rendererRef.current?.render(
        sceneRef.current as THREE.Object3D<THREE.Event>,
        cameraRef.current as THREE.Camera,
      );

      cameraRef.current?.updateProjectionMatrix();

      const time = clock.getDelta();
      controlsRef.current?.update();
  };

  useMount(async () => {
    const textureLoader = new  THREE.TextureLoader();
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/gltf/');
    gltfLoader.setDRACOLoader( dracoLoader );

    const svgLoader = new SVGLoader();
    const rgbeLoader = new RGBELoader();

    // 创建场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.background = new THREE.Color(0XFFFFFF);
    scene.fog = new THREE.Fog(0xffffff, 900, 2000);
    sceneRef.current = scene;
    
    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
    camera.updateProjectionMatrix();
    camera.position.set(216.94872698773818, 87.0550873667015, -7.594180436943702
      );
    cameraRef.current = camera;

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({  antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.sortObjects = false;
    rendererRef.current = renderer;
    canvasRef.current = renderer.domElement;

    const canvasWrap = document.getElementById('3d-scene');
    canvasWrap?.appendChild(canvasRef.current);
    

    // 添加控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.update();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 3.0;
    controls.maxDistance = 1000;
    controls.minDistance = 150;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 8;
    controls.screenSpacePanning = false;
    controls.enablePan = false;
    
    controlsRef.current = controls;

    // 坐标轴辅助器
    // const axesHelper = new THREE.AxesHelper( 150 );
    // scene.add( axesHelper );

    // 添加光照
    const ambientLight = new THREE.AmbientLight(0xffffff, .5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0XFFFFFF, 0.3);
    pointLight1.position.set(300, 60, 0);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0XFFFFFF, 0.3);
    pointLight2.position.set(0, 60, 300);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0XFFFFFF, 0.3);
    pointLight3.position.set(0, 60, -300);
    scene.add(pointLight3);
    
    const pointLight4 = new THREE.PointLight(0XFFFFFF, 0.3);
    pointLight4.position.set(-300, 60, 0);
    scene.add(pointLight4);
    
    const pointLight5 = new THREE.PointLight(0XFFFFFF, 0.3);
    pointLight5.position.set(0, 300, -60);
    scene.add(pointLight5);

    // const directionalLightHelper = new THREE.DirectionalLightHelper(directionLight, 5);
    // scene.add(directionalLightHelper);

    // 加载大理石材质
    // const texture = textureLoader.load(marbleMap);
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.encoding = THREE.sRGBEncoding;
    // texture.flipY = false;
    // const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

    // 加载碗的模型
    // const bowl = await gltfLoader.load(bowlModel, (gltf) => {
    //   gltf.scene.position.set(0, 0, 0);
    //   gltf.scene.traverse((obj) => {
        
    //     if(obj instanceof THREE.Mesh && obj.name === '碗') {
    //       obj.material = material;
    //     }
    //    })

    //   camera.lookAt(gltf.scene.position);
    //   scene.add(gltf.scene);
      
    // });

    // 加载末道棉箱模型
    const reserveBox = gltfLoader.load(reserveBoxModel, (gltf) => {

      gui.add(gltf.scene.position, 'x').min(0).max(1000).step(1).name('末道棉箱x坐标');
      gui.add(gltf.scene.position, 'y').min(0).max(1000).step(1).name('末道棉箱y坐标');
      gui.add(gltf.scene.position, 'z').min(0).max(1000).step(1).name('末道棉箱z坐标');

      gui.add(gltf.scene.rotation, 'x').min(0).max(2 * Math.PI).step(Math.PI / 180).name('末道棉箱旋转x');
      gui.add(gltf.scene.rotation, 'y').min(0).max(2 * Math.PI).step(Math.PI / 180).name('末道棉箱旋转y');
      gui.add(gltf.scene.rotation, 'z').min(0).max(2 * Math.PI).step(Math.PI / 180).name('末道棉箱旋转z');

      gltf.scene.scale.set(3, 3, 3);
      gltf.scene.rotation.y = 3.0543261909900767;
      gltf.scene.position.set(0, 0, 60);

      gltf.scene.traverse((obj) => {
        if(obj instanceof THREE.Mesh && obj.isMesh) {

          if(obj.name === '连接器') {
            
            camera.lookAt(obj.position);
            controls.target = obj.position;
          }
          
        }
      });

      scene.add(gltf.scene);
    });
  

    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.sortObjects = false;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix;
    });

    render();
    
    return () => {
      window.removeEventListener('resize', () => {});
    }
  });

  return <div id='3d-scene'></div>
};

export default ThreeDemo;