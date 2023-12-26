import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import WebGL from "three/addons/capabilities/WebGL.js";
// import Stats from 'three/examples/jsm/libs/stats.module'

let model_1, model_2, model_3, model_4;

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
    // const light = new THREE.PointLight(0xffffff, 0.1);
    scene.background = new THREE.Color(0x006600);

    function inProgress(xhr) {
        if (xhr.lengthComputable) {
            const percentComplete = (xhr.loaded / xhr.total) * 100;
            console.log(Math.round(percentComplete, 2) + "% downloaded");
        }
    }

    let butterfly_model;
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
    loader.setDRACOLoader(dracoLoader);

    camera.position.z = 100;


    // Loading object
    // const geometry = new THREE.BoxGeometry(10, 10, 10);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube_top_left = new THREE.Mesh(geometry, material);
    // const cube_top_right = new THREE.Mesh(geometry, material);
    // const cube_bottom_left = new THREE.Mesh(geometry, material);
    // const cube_bottom_right = new THREE.Mesh(geometry, material);

    loader.load(
        'assets/butterfly.glb',
        async function (gltf) {
            model_1 = gltf.scene;

            model_1.scale.set(0.1, 0.1, 0.1);
            model_1.position.x = -50;
            scene.add(model_1);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.log(error);
        }
    );

    loader.load(
        'assets/butterfly.glb',
        async function (gltf) {
            model_2 = gltf.scene;

            model_2.scale.set(0.1, 0.1, 0.1);
            model_2.position.x = -50;
            model_2.position.y = -30;
            scene.add(model_2);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.log(error);
        }
    );

    loader.load(
        'assets/butterfly.glb',
        async function (gltf) {
            model_3 = gltf.scene;

            model_3.scale.set(0.1, 0.1, 0.1);
            model_3.position.x = 50;
            scene.add(model_3);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.log(error);
        }
    );

    loader.load(
        'assets/butterfly.glb',
        async function (gltf) {
            model_4 = gltf.scene;

            model_4.scale.set(0.1, 0.1, 0.1);
            model_4.position.x = 50;
            model_4.position.y = -30;
            scene.add(model_4);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.log(error);
        }
    );
    camera.position.z = 50;

    // const stats = new Stats();
    // document.body.appendChild(stats.dom);

    // Def animation and render function
    function animate() {
        requestAnimationFrame(animate);

        model_1.rotation.x += 0.01;
        model_1.rotation.y += 0.01;

        model_2.rotation.x += 0.01;
        model_2.rotation.y += 0.01;

        model_3.rotation.x += 0.01;
        model_3.rotation.y += 0.01;

        model_4.rotation.x += 0.01;
        model_4.rotation.y += 0.01;


        // stats.update();
        renderer.render(scene, camera);
    }
animate();
}