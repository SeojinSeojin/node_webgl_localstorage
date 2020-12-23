var scene, camera, renderer, particleSystem;

init();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, -5, 12);

    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(1, 10, 6);
    scene.add(light);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    scene.background = new THREE.Color(0x2c9cd4);

    const plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(10000, 10000),
        new THREE.MeshBasicMaterial({ color: 0xc5dbe6, opacity: 0.5 })
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
        const particle = new THREE.Vector3(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 550 - 200);
        particles.vertices.push(particle);
    }
    const particleTexture = THREE.ImageUtils.loadTexture('./img/snowflake.png');
    const particleMaterial = new THREE.ParticleBasicMaterial({ map: particleTexture, transparent: true, size: 4 });
    particleSystem = new THREE.ParticleSystem(particles, particleMaterial);
    particleSystem.position.z = -50
    scene.add(particleSystem);

    //선물상자
    const presentBox = new THREE.Group()
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
    presentBox.add(box, box2);

    scene.add(presentBox)
        //방울
    const geometry3 = new THREE.SphereGeometry(1.4, 32, 32);
    const material3 = new THREE.MeshToonMaterial({ color: 0xe8d072 });
    const xPoses = [0, 3.5, -2, -7.4, -2.5, 3, 8.5, -1, -9.5]
    for (let j = 0; j < 9; j++) {
        const sphere = new THREE.Mesh(geometry3, material3);
        sphere.position.z = -40 + (Math.floor(j / 3)) * 2;
        if (j == 1 || j == 3 || j == 6 || j == 8) {
            sphere.position.z -= 3
        }
        sphere.position.y = 17 - (j * 2.5);
        sphere.position.x = xPoses[j];
        scene.add(sphere)
    }

    //별
    var starTexture = new THREE.TextureLoader().load("./img/star.png");
    let geometry6 = new THREE.PlaneGeometry(7, 7);
    let material6 = new THREE.MeshBasicMaterial({ map: starTexture, transparent: true });
    let star = new THREE.Mesh(geometry6, material6);
    star.position.z = -45;
    star.position.y = 25
    scene.add(star)
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