import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import fragment from "./shader/fragment.glsl";
import vertex from "./shader/vertex.glsl";
import ON from '../img/ON.jpg'


export default class Sketch {
  constructor(options) {
    this.time = 0;
    this.container = options.dom;
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color( 0x4c96f7 );

    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 0.01, 10 );
    this.camera.position.z = 2;

    //
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setSize( this.width, this.height );

    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.resize();
    this.setupResize();
    this.addObjects();
    this.render();
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize( this.width, this.height );
    this.camera.aspect = this.width / this.height;    
    this.camera.updateProjectionMatrix();
  }
 
  addObjects() {
    this.geometry = new THREE.PlaneBufferGeometry( 1, 1, 40, 40 );
    // const objects = 5;
    // for (var i = 0; i <= objects; i++ ) {
      this.geometry = new THREE.SphereBufferGeometry( 0.4, 40, 40 );
      this.material = new THREE.MeshNormalMaterial();
      
      this.material = new THREE.ShaderMaterial({
        uniforms: { 
          time: {value: 0},
          onTexture: { value: new THREE.TextureLoader().load(ON)},
        },
        side: THREE.DoubleSide,
        fragmentShader: fragment, 
        vertexShader: vertex,
        // wireframe: true
      })
    
      this.mesh = new THREE.Mesh( this.geometry, this.material );
      // this.mesh.position.x = i - 1; 
      this.scene.add( this.mesh );
    // }
  }

  render() {
    this.time += 0.1;
    this.mesh.rotation.x = this.time / 20000;
    this.mesh.rotation.y = this.time / 20000;

    this.material.uniforms.time.value = this.time;
  
    this.renderer.render( this.scene, this.camera );
  
    window.requestAnimationFrame(this.render.bind(this));
  }
}

new Sketch({
  dom: document.getElementById("container")
});