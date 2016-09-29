// GLOBALS ======================================================

var camera, scene, renderer, controls, clock;
var INV_MAX_FPS = 1 / 100, frameDelta = 0;
var threediv = document.querySelector('#three');

// SETUP ========================================================

function setup() {
    threediv.style.backgroundColor = '#d7f0f7';
    setupThreeJS(threediv);
    setupWorld();

    requestAnimationFrame(function animate() {
        draw();

        frameDelta += clock.getDelta();
        while (frameDelta >= INV_MAX_FPS) {
            update(INV_MAX_FPS);
            frameDelta -= INV_MAX_FPS;
        }

        requestAnimationFrame( animate );
    });
    window.addEventListener( 'resize', onWindowResize, false );
}

function setupThreeJS(elem) {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x9db3b5, 0.002);

    camera = new THREE.PerspectiveCamera( 75, elem.clientWidth / elem.clientHeight, 1, 10000 );
    camera.position.y = 400;
    camera.position.z = 400;
    camera.rotation.x = -45 * Math.PI / 180;

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( elem.clientWidth, elem.clientHeight);
    renderer.shadowMapEnabled = true;
    elem.appendChild( renderer.domElement );

    clock = new THREE.Clock();
    controls = new THREE.FirstPersonControls(camera);
    controls.movementSpeed = 100;
    controls.lookSpeed = 0.1;
}

function onWindowResize(){
    camera.aspect = threediv.clientWidth / threediv.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(threediv.clientWidth, threediv.clientHeight);
}

function setupWorld() {
    var geo = new THREE.PlaneGeometry(2000, 2000, 40, 40);
    var mat = new THREE.MeshPhongMaterial({color: 0x9db3b5, overdraw: true});
    var floor = new THREE.Mesh(geo, mat);
    floor.rotation.x = -0.5 * Math.PI;
    floor.receiveShadow = true;
    scene.add(floor);

    var geometry = new THREE.CubeGeometry( 1, 1, 1 );
    geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
    var material = new THREE.MeshPhongMaterial({overdraw: true, color: 0xcccccc});

    var cityGeometry = new THREE.Geometry();
    for (var i = 0; i < 300; i++) {
        var building = new THREE.Mesh(geometry.clone());
        building.position.x = Math.floor( Math.random() * 200 - 100 ) * 4;
        building.position.z = Math.floor( Math.random() * 200 - 100 ) * 4;
        building.scale.x  = Math.pow(Math.random(), 2) * 50 + 10;
        building.scale.y  = Math.pow(Math.random(), 3) * building.scale.x * 8 + 8;
        building.scale.z  = building.scale.x;
        THREE.GeometryUtils.merge(cityGeometry, building);
    }
    var city = new THREE.Mesh(cityGeometry, material);
    city.castShadow = true;
    city.receiveShadow = true;
    scene.add(city);

    var light = new THREE.DirectionalLight(0xf9f1c2, 1);
    light.position.set(500, 1500, 1000);
    light.castShadow = true;
    light.shadowMapWidth = 2048;
    light.shadowMapHeight = 2048;
    var d = 1000;
    light.shadowCameraLeft = d;
    light.shadowCameraRight = -d;
    light.shadowCameraTop = d;
    light.shadowCameraBottom = -d;
    light.shadowCameraFar = 2500;
    scene.add(light);
}

// DRAW =========================================================

function draw() {
    renderer.render( scene, camera );
}

// UPDATE =======================================================

function update(delta) {
    controls.update(delta);
}

// RUN ==========================================================

setup();