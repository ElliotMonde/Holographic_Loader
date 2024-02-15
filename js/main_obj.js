import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import WebGL from "three/addons/capabilities/WebGL.js";

if (WebGL.isWebGLAvailable()) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    scene.background = new THREE.Color(0x333333);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 15); // color, intensity
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);


    function inProgress(xhr) {
        if (xhr.lengthComputable) {
            const percentComplete = (xhr.loaded / xhr.total) * 100;
            console.log(Math.round(percentComplete, 2) + "% downloaded");
        }
    }

    const loader = new OBJLoader();
    // const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
    // loader.setDRACOLoader(dracoLoader);


    function loadModel(url, x_pos = null, y_pos = null) {
        loader.load(
            url,
            function (object) {
                object.scale.set(0.2,0.2,0.2);

                if (x_pos != null) {
                    object.position.x = x_pos;
                }
                if (y_pos != null) {
                    object.position.y = y_pos;

                }
                // scene.add(object);
                scene.add(object);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.log(error);
            }
        )
    }
    let url = 'assets/kayak_body.obj';
    loadModel(url, -80, 50);
    loadModel(url, -80, -55);
    loadModel(url, 80, 50)
    loadModel(url, 80, -55)


    camera.position.z = 150;
    let modelsToRotate = scene.children;
    // console.log("Children")
    function animate() {
        requestAnimationFrame(animate);
        modelsToRotate.forEach((model) => {
            model.rotation.x += 0.01;
            model.rotation.y += 0.01;
        });
        renderer.render(scene, camera);
    }
    animate();
}