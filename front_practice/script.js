var scene, camera, renderer, icecream;

init();

function init() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.x = -35;
    camera.position.y = -5;
    camera.position.z = -20;
    camera.rotation.y = Math.PI * (1.35)
    scene.add(camera)

    const pointLight = new THREE.PointLight(0xff0000, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight)

    const light = new THREE.DirectionalLight(0xFFFFFF, 3);
    light.position.set(0, 2, 1);
    scene.add(light);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    icecream = new THREE.Group()
        //Add meshes here 
    const geometry1 = new THREE.SphereGeometry(5, 35, 35, 0, Math.PI * 2);
    const material1 = new THREE.MeshToonMaterial({ color: 0x13660b });
    const sphere = new THREE.Mesh(geometry1, material1);
    icecream.add(sphere);
    sphere2 = sphere.clone();
    sphere2.scale.x = 0.8;
    sphere2.scale.y = 0.8;
    sphere2.scale.z = 0.8;
    sphere2.position.x = 3;
    sphere2.position.y = 3;
    sphere2.rotation.x = Math.PI / 6
    icecream.add(sphere2);
    const geometry2 = new THREE.ConeGeometry(4, 15, 30);
    const material2 = new THREE.MeshToonMaterial({ color: 0x61421b });
    const cone = new THREE.Mesh(geometry2, material2);
    cone.rotation.z = Math.PI;
    cone.position.y = -10;
    const material4 = new THREE.MeshToonMaterial({ color: 0x402604, wireframe: true, wireframeLinecap: "round" })
    const cone2 = new THREE.Mesh(geometry2, material4);
    cone2.rotation.z = Math.PI;
    cone2.position.y = -10;
    icecream.add(cone2)
    const geometry3 = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material3 = new THREE.MeshToonMaterial({ color: 0x402604 });
    const cube = new THREE.Mesh(geometry3, material3);
    cube.position.x = -3;
    cube.position.y = 3;
    cube.rotation.x = Math.PI / 3
    const cube2 = cube.clone()
    cube2.position.x = 5.3;
    cube2.position.y = 5.3;
    cube2.position.z = -2;
    const cube3 = cube.clone()
    cube3.position.x = -2;
    cube3.position.y = 2.5;
    cube3.position.z = 3;
    cube3.rotation.y = Math.PI / 6;
    const cube4 = cube.clone()
    cube4.position.x = 2.2;
    cube4.position.y = 6;
    cube4.position.z = 2;
    const cube5 = cube.clone()
    cube5.position.z = -3;
    cube5.position.y = -2;
    const cube6 = cube.clone()
    cube6.position.x = 4;
    cube6.position.y = -1;
    cube6.position.z = -1.5
    const cube7 = cube.clone()
    cube7.position.x = 1;
    cube7.position.y = 4;
    cube7.position.z = -3;
    icecream.add(cube, cube2, cube3, cube4, cube5, cube6, cube7);
    icecream.add(cone);
    scene.add(icecream)
    window.addEventListener('resize', resize, false);

    update();
}

function update() {
    requestAnimationFrame(update);
    renderer.render(scene, camera);
    icecream.rotation.y += 0.02;
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}