var scene, camera, renderer, particleSystem;

init();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('grey');

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, -5, 12);

    const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(1, 10, 6);
    scene.add(light);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    scene.background = new THREE.Color(0xcffaf8);

    const plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(10000, 10000),
        new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.5 })
    );
    plane.position.y = -20;
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    //줄기;
    const geometry = new THREE.BoxGeometry(5, 35, 5);
    const material = new THREE.MeshToonMaterial({ color: 0x61300d });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.z = -50;
    scene.add(cube);

    //이파리
    for (let i = 2; i <= 3; i++) {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(5 * i, 10 * i, 32), new THREE.MeshToonMaterial({ color: 0x0c5e2c }))
        cone.position.z = -50;
        cone.position.y = 28 - (i - 1) * 10;
        scene.add(cone);
    }
    window.addEventListener('resize', resize, false);

    //이파리 장식
    const torus = new THREE.Mesh(new THREE.TorusBufferGeometry(12.5, 0.4, 16, 100), new THREE.MeshToonMaterial({ color: 0xb32429 }));
    torus.rotation.x = Math.PI / 2;
    torus.rotation.y = Math.PI / 12;
    torus.position.z = -50
    torus.position.x = -1.5
    const torus2 = new THREE.Mesh(new THREE.TorusBufferGeometry(10, 0.4, 16, 100), new THREE.MeshToonMaterial({ color: 0xb32429 }));
    torus2.rotation.x = Math.PI / 2;
    torus2.rotation.y = -Math.PI / 9;
    torus2.position.z = -50;
    torus2.position.x = 0.4;
    torus2.position.y = 7;
    const torus3 = new THREE.Mesh(new THREE.TorusBufferGeometry(7.5, 0.4, 16, 100), new THREE.MeshToonMaterial({ color: 0xb32429 }));
    torus3.rotation.x = Math.PI / 2;
    torus3.rotation.y = Math.PI / 8;
    torus3.position.z = -50;
    torus3.position.x = -1.3;
    torus3.position.y = 14;
    const torus4 = new THREE.Mesh(new THREE.TorusBufferGeometry(4.5, 0.4, 16, 100), new THREE.MeshToonMaterial({ color: 0xb32429 }));
    torus4.rotation.x = Math.PI / 2;
    torus4.rotation.y = -Math.PI / 9;
    torus4.position.z = -50;
    torus4.position.x = 0.7;
    torus4.position.y = 19.5;
    scene.add(torus, torus2, torus3, torus4);

    //눈
    const particles = new THREE.Geometry;
    for (let p = 0; p < 2000; p++) {
        const particle = new THREE.Vector3(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 500 - 250);
        particles.vertices.push(particle);
    }
    const particleTexture = THREE.ImageUtils.loadTexture('./img/snowflake.png');
    const particleMaterial = new THREE.ParticleBasicMaterial({ map: particleTexture, transparent: true, size: 4 });
    particleSystem = new THREE.ParticleSystem(particles, particleMaterial);
    particleSystem.position.z = -50
    scene.add(particleSystem);

    //선물상자
    const geometry2 = new THREE.BoxGeometry(7, 7, 7);
    const material2 = new THREE.MeshToonMaterial({ color: 0xed413e });
    const box = new THREE.Mesh(geometry2, material2);
    box.position.z = -45
    box.position.y = -15
    box.position.x = 10
    box2 = box.clone();
    box2.scale.x *= 1.1
    box2.scale.y *= 0.2
    box2.scale.z *= 1.1
    box2.position.x -= 1
    box2.position.y += 4
    box2.rotation.y = 0.2
    box2.rotation.z = 0.2
    scene.add(box, box2);

    //방울
    const geometry3 = new THREE.SphereGeometry(1.4, 32, 32);
    const material3 = new THREE.MeshToonMaterial({ color: 0xe8d072 });
    const sphere = new THREE.Mesh(geometry3, material3);
    sphere.position.z = -40;
    sphere.position.y = 13;
    sphere.position.x = 2;
    const sphere2 = sphere.clone();
    sphere2.position.y = 11;
    sphere2.position.x = -3;
    const sphere3 = sphere.clone();
    sphere3.position.y = 7.5;
    sphere3.position.x = -6;
    const sphere4 = sphere.clone();
    sphere4.position.y = 6;
    sphere4.position.x = -1;
    sphere4.position.z += 4
    const sphere5 = sphere.clone();
    sphere5.position.y = 4.2;
    sphere5.position.x = 5;
    const sphere6 = sphere.clone();
    sphere6.position.y = -3;
    sphere6.position.x = -9;
    sphere6.position.z += 5
    const sphere7 = sphere.clone();
    sphere7.position.y = -2;
    sphere7.position.x = -3.5;
    sphere7.position.z += 7
    const sphere8 = sphere.clone();
    sphere8.position.y = -0.3;
    sphere8.position.x = 2;
    sphere8.position.z += 5
    const sphere9 = sphere.clone();
    sphere9.position.y = 1.2;
    sphere9.position.x = 7.6;
    sphere9.position.z += 3
    const sphere0 = sphere.clone();
    sphere0.position.y = 16.4;
    sphere0.position.x = -0.4;

    scene.add(sphere, sphere2, sphere3, sphere4, sphere5, sphere6, sphere7, sphere8, sphere9, sphere0);
    update();
}

function update() {
    requestAnimationFrame(update);
    renderer.render(scene, camera);
    particleSystem.rotation.y -= 0.01;
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}