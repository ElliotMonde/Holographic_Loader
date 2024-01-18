import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
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
    scene.background = new THREE.Color(0x000000);
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

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
    loader.setDRACOLoader(dracoLoader);

    camera.position.z = 100;

    function loadModel(url, x_pos = null, y_pos = null) {
        loader.load(
            url,
            function (gltf) {
                const model = gltf.scene;
                model.scale.set(0.2, 0.2, 0.2);

                if (x_pos != null) {
                    model.position.x = x_pos;
                }
                if (y_pos != null) {
                    model.position.y = y_pos;

                }
                scene.add(model);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.log(error);
            }
        )
    }
    let url = 'assets/butterfly.glb';
    loadModel(url, -30, 8);
    loadModel(url, -30, -25);
    loadModel(url, 30, 8)
    loadModel(url, 30, -25)


    camera.position.z = 50;
    let modelsToRotate = scene.children;
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