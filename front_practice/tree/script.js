var scene, camera, renderer, particleSystem, merryChristmas, sphereSet1, sphereSet2, flag = true

init();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, -5, 12);

    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(1, 2, 6);
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
        new THREE.MeshBasicMaterial({ color: 0xc5dbe6, opacity: 0.8 })
    );
    plane.position.y = -20;
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    //줄기;
    const cube = new THREE.Mesh(new THREE.BoxGeometry(5, 35, 5), new THREE.MeshToonMaterial({ color: 0x61300d }));
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
    torus.position.set(-1.5, 0, -50)
    const torus2 = new THREE.Mesh(new THREE.TorusBufferGeometry(10, 0.4, 16, 100), new THREE.MeshToonMaterial({ color: 0xb32429 }));
    torus2.rotation.x = Math.PI / 2;
    torus2.rotation.y = -Math.PI / 9;
    torus2.position.set(0.4, 7, -50)
    const torus3 = new THREE.Mesh(new THREE.TorusBufferGeometry(7.5, 0.4, 16, 100), new THREE.MeshToonMaterial({ color: 0xb32429 }));
    torus3.rotation.x = Math.PI / 2;
    torus3.rotation.y = Math.PI / 8;
    torus3.position.set(-1.3, 14, -50)
    const torus4 = new THREE.Mesh(new THREE.TorusBufferGeometry(4.5, 0.4, 16, 100), new THREE.MeshToonMaterial({ color: 0xb32429 }));
    torus4.rotation.x = Math.PI / 2;
    torus4.rotation.y = -Math.PI / 9;
    torus4.position.set(0.7, 19.5, -50)
    scene.add(torus, torus2, torus3, torus4);

    //눈
    const particles = new THREE.Geometry;
    for (let p = 0; p < 2500; p++) {
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
    const box = new THREE.Mesh(new THREE.BoxGeometry(7, 7, 7), new THREE.MeshToonMaterial({ color: 0xed413e }));
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
    sphereSet1 = new THREE.Group();
    sphereSet2 = new THREE.Group();
    const geometry3 = new THREE.SphereGeometry(1.4, 32, 32);
    const materialYellow = new THREE.MeshToonMaterial({ color: 0xfffbc9 });
    const materialBlue = new THREE.MeshToonMaterial({ color: 0xc9fbff });
    const xPoses = [0, 3.5, -2, -7.4, -2.5, 3, 8.5, -1, -9.5]
    for (let j = 0; j < 9; j++) {
        const sphereYellow = new THREE.Mesh(geometry3, materialYellow);
        const sphereBlue = new THREE.Mesh(geometry3, materialBlue);
        sphereYellow.position.z = -40 + (Math.floor(j / 3)) * 2;
        sphereBlue.position.z = -40 + (Math.floor(j / 3)) * 2;
        if (j == 1 || j == 3 || j == 6 || j == 8) {
            sphereYellow.position.z -= 3
            sphereBlue.position.z -= 3
        }
        sphereYellow.position.y = 17 - (j * 2.5);
        sphereBlue.position.y = 17 - (j * 2.5);
        sphereYellow.position.x = xPoses[j];
        sphereBlue.position.x = xPoses[j];
        if (j % 2) {
            sphereSet1.add(sphereYellow)
            sphereSet2.add(sphereBlue)
        } else {
            sphereSet1.add(sphereBlue)
            sphereSet2.add(sphereYellow)
        }
    }
    scene.add(sphereSet1, sphereSet2)

    //별
    var starTexture = new THREE.TextureLoader().load("./img/star.png");
    let star = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), new THREE.MeshBasicMaterial({ map: starTexture, transparent: true }));
    star.position.z = -45;
    star.position.y = 25
    scene.add(star);

    //눈사람
    const snowman = new THREE.Group();
    const snowman1 = new THREE.Mesh(new THREE.SphereGeometry(7, 40, 40), new THREE.MeshToonMaterial({ color: 0xffffff }));
    snowman1.position.set(-15, -15, -35)
    const snowman2 = snowman1.clone();
    snowman2.position.y = -5;
    snowman2.scale.x *= 0.7;
    snowman2.scale.y *= 0.7;
    snowman2.scale.z *= 0.7;
    scene.fog = new THREE.Fog({ color: 0xffffff })
    const hat = new THREE.Group()
    const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 5, 32), new THREE.MeshToonMaterial({ color: 0x872222 }));
    cylinder.position.set(-15, 4, -35)
    const cylinder2 = cylinder.clone();
    cylinder2.scale.x *= 2;
    cylinder2.scale.y *= 0.15;
    cylinder2.scale.z *= 2;
    cylinder2.position.y = 1.2;
    const eyeR = new THREE.Mesh(new THREE.CircleGeometry(0.4, 32), new THREE.MeshBasicMaterial({ color: 0x000000 }));
    eyeR.position.set(-15, -3, -30)
    const eyeL = eyeR.clone();
    eyeL.position.x = -12;
    const nose = new THREE.Mesh(new THREE.ConeGeometry(1, 6, 32), new THREE.MeshToonMaterial({ color: 0xed9528 }));
    nose.rotation.x = Math.PI / 2;
    nose.rotation.z = -Math.PI / 24;
    nose.position.set(-13, -5, -25);
    snowman.add(nose, snowman1, snowman2);
    snowman.add(eyeR, eyeL);
    hat.add(cylinder, cylinder2);
    hat.rotation.z = Math.PI / 24;
    snowman.add(hat)
    var merryChristmasTexture = new THREE.TextureLoader().load("./img/Merry-Christmas.png");
    merryChristmas = new THREE.Mesh(new THREE.PlaneGeometry(10, 4), new THREE.MeshBasicMaterial({ map: merryChristmasTexture, transparent: true }));
    merryChristmas.position.z = -25;
    merryChristmas.position.y = -6;
    merryChristmas.position.x = -13;
    merryChristmas.rotation.x = -Math.PI / 12
    snowman.add(merryChristmas);

    scene.add(snowman);
    update();
}

function update() {
    requestAnimationFrame(update);
    renderer.render(scene, camera);
    particleSystem.rotation.y -= 0.005;

    if (merryChristmas.rotation.y < -0.4) {
        if (flag) {
            flag = false
        }
    }
    if (merryChristmas.rotation.y > 0.4) {
        if (!flag) {
            flag = true
        }
    }
    if (flag) {
        merryChristmas.rotation.y -= 0.008;
        merryChristmas.rotation.z += 0.0005;
        sphereSet1.visible = true
        sphereSet2.visible = false
    } else {
        merryChristmas.rotation.y += 0.008;
        merryChristmas.rotation.z -= 0.0005;
        sphereSet1.visible = false
        sphereSet2.visible = true
    }
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}