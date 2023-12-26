import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import WebGL from "three/addons/capabilities/WebGL.js";

const scene_one = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Loading object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube_top_left = new THREE.Mesh(geometry, material);
const cube_top_right = new THREE.Mesh(geometry, material);
const cube_bottom_left = new THREE.Mesh(geometry, material);
const cube_bottom_right = new THREE.Mesh(geometry, material);
cube_top_left.position.x = -4;
cube_top_left.position.y = 2;

cube_top_right.position.x = 4;
cube_top_right.position.y = 2;

cube_bottom_left.position.x = -4;
cube_bottom_left.position.y = -2;

cube_bottom_right.position.x = 4;
cube_bottom_right.position.y = -2;

scene_one.add(cube_top_left, cube_bottom_left, cube_top_right, cube_bottom_right);

camera.position.z = 5;


// Def animation and render function
function animate() {
    requestAnimationFrame(animate);

    cube_top_left.rotation.x += 0.01;
    cube_top_left.rotation.y += 0.01;

    cube_top_right.rotation.x += 0.01;
    cube_top_right.rotation.y += 0.01;

    cube_bottom_left.rotation.x += 0.01;
    cube_bottom_left.rotation.y += 0.01;

    cube_bottom_right.rotation.x += 0.01;
    cube_bottom_right.rotation.y += 0.01;
    
    renderer.render(scene_one, camera);
}

animate();

