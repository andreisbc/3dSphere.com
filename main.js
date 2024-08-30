//the shadows aren t working
import * as THREE from "three"
import './style.css'
import {gsap} from "gsap"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"


//Scene
const scene = new THREE.Scene()

//Create our sphere
const geometry = new THREE.SphereGeometry( 3, 64, 64 ); 
const material = new THREE.MeshStandardMaterial( {
    color: "#00ff83",
  } ); 
const sphere = new THREE.Mesh( geometry, material ); scene.add( sphere );

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Light
const light = new THREE.PointLight(0xffffff, 30, 100);
light.position.set(0, 10, 10);
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(2)//to not see the pixels
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false //disable the grab and move the object
controls.enableZoom = false //disable the zoom on the object!!!
controls.autoRotate = true
controls.autoRotateSpeed = 5

//Resize
window.addEventListener("resize", () => {
  //Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //Update Camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})


const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

//sincronizat multiple animation
const tl = gsap.timeline({ defaults: {duration: 1}})
tl.fromTo(mesh.scale, {z: 0, x: 0, y: 0 }, {z: 1, x: 1, y:1})//animate a thing from a position to another position(in this case mash.scale)
tl.fromTo("nav", {y: "-100%"}, {y:"0%"})//pushing nav off the screen,vrey cool animation!!!
tl.fromTo(".title", {opacity: 0}, {opacity: 1})//animation!!

//mouse animation
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150,
    ];
    // Let's animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`); // Folosește backticks pentru șirul de șablon
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
  }
});