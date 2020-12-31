let container;
let camera, cameraTarget, scene, renderer;
let group, textMesh1, textMesh2, textGeo, material, ring, orbitgroup, moon;
let flag = true
let text1 = 'Happy New Year';
let text2 = 'No More Corona in 2021';
const height = 10,
    size1 = 25,
    size2 = 17.5,
    hover1 = 43,
    hover2 = 6,
    curveSegments = 2,
    bevelThickness = 1,
    bevelSize = 1.5;
let font = null;
const mirror = true;

init();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 500, 600);

    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(1, 2, 6).normalize();
    scene.add(light);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.maxDistance = 850
    controls.maxPolarAngle = Math.PI * (1 / 2.5)
    controls.update();

    const plane = new THREE.Mesh(
        new THREE.CircleBufferGeometry(250, 30),
        new THREE.MeshBasicMaterial({
            color: 0x000000,
            opacity: 0.6,
            transparent: true
        })
    );
    plane.position.y = 0;
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);
    const ctloader = new THREE.CubeTextureLoader();
    const texture = ctloader.load([
        'img/corona_ft.png',
        'img/corona_bk.png',
        'img/corona_up.png',
        'img/corona_dn.png',
        'img/corona_rt.png',
        'img/corona_lf.png',
    ]);
    scene.background = texture;

    material1 = new THREE.MeshStandardMaterial({
        color: 0xa5a81d,
    });
    material2 = new THREE.MeshStandardMaterial({
        color: 0xa30d0d,
    });
    group = new THREE.Group();
    scene.add(group);
    const loader = new THREE.FontLoader();
    loader.load("font/helvetiker_regular.typeface.json", function(response) {
        font = response;
        createText(text1, hover1, size1, material1)
        createText(text2, hover2, size2, material2)
    })
    orbitgroup = new THREE.Group()
    ring = new THREE.Mesh(new THREE.TorusBufferGeometry(249.5, 0.5, 16, 100), new THREE.MeshBasicMaterial({ color: 0x5f6101 }));
    moon = new THREE.Mesh(new THREE.SphereGeometry(20, 30), new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture("img/moon.jpg") }))
    moon.position.y = 250
    orbitgroup.add(ring, moon);

    orbitgroup.rotation.y = Math.PI * (1 / 4)

    scene.add(orbitgroup)
    loadSpaceshipMTL();
    update();
}

function loadSpaceshipOBJ(materials) {
    var loader = new THREE.OBJLoader();
    loader.setMaterials(materials);
    console.log(materials);
    loader.load('obj/spaceship/spaceship.obj', function(obj) {
        obj.rotation.z += Math.PI / 2;
        obj.position.y = 0
        obj.position.x = 250
        obj.scale.set(20, 20, 20);
        orbitgroup.add(obj);
    }, function(xhr) {
        console.log('Spaceship OBJLoader: ', xhr.loaded / xhr.total * 100, '% loaded');
    }, function(error) {
        console.log(error);
    });
}

function loadSpaceshipMTL() {
    mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('obj/spaceship/spaceship.mtl', function(materials) {
        materials.preload();
        loadSpaceshipOBJ(materials);
    }, function(xhr) {
        console.log('Spaceship MTLLoader: ', xhr.loaded / xhr.total * 100, '% loaded');
    }, function(error) {
        console.error(error);
    });
}


function createText(text, hover, size, material) {
    textGeo = new THREE.TextBufferGeometry(text, {
        font: font,
        size: size,
        height: height,
        curveSegments: curveSegments,
        bevelThickness: bevelThickness,
        bevelSize: bevelSize,
        bevelEnabled: true,
        material: 0,
        extrudeMaterial: 1
    });
    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();
    const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
    textMesh1 = new THREE.Mesh(textGeo, material);
    textMesh1.position.x = centerOffset;
    textMesh1.position.y = hover;
    textMesh1.position.z = 0;
    textMesh1.rotation.x = 0;
    textMesh1.rotation.y = Math.PI * 2;
    group.add(textMesh1);
    if (mirror) {

        textMesh2 = new THREE.Mesh(textGeo, material);

        textMesh2.position.x = centerOffset;
        textMesh2.position.y = -hover;
        textMesh2.position.z = height;

        textMesh2.rotation.x = Math.PI;
        textMesh2.rotation.y = Math.PI * 2;

        group.add(textMesh2);

    }
}


function update() {
    requestAnimationFrame(update);
    renderer.render(scene, camera);
    orbitgroup.rotation.z += (Math.PI * (1 / 360))
    if (group.rotation.y >= (Math.PI * (1 / 4))) {
        flag = true
    }
    if (group.rotation.y <= -(Math.PI * (1 / 4))) {
        flag = false
    }
    if (flag) {
        group.rotation.y -= (Math.PI * (1 / 1440))
    } else {
        group.rotation.y += (Math.PI * (1 / 1440))
    }
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}