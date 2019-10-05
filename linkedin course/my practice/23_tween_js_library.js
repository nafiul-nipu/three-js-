/*
this is for library tween.js which will help 
to modify animation process lot nicer

Tween.js Easing allows to adjust the pacing of an
animation by using mathematical curves

Tween.min.js is the library

instantiate tween obj by calling the TWEEN method
then provide it with an object that has an initial set of values

*/
function init() {
	var scene = new THREE.Scene();
	var gui = new dat.GUI();
	var clock = new THREE.Clock();

	var enableFog = true;

	if (enableFog) {
		scene.fog = new THREE.FogExp2(0xffffff, 0.01);
	}
	
	var plane = getPlane(100);
	var directionalLight = getDirectionalLight(1);
	var sphere = getSphere(0.05);
	var boxGrid = getBoxGrid(20, 2.5);

	plane.name = 'plane-1';
	boxGrid.name = 'boxGrid';

	plane.rotation.x = Math.PI/2;
	directionalLight.position.x = 13;
	directionalLight.position.y = 10;
	directionalLight.position.z = 10;
	directionalLight.intensity = 2;

	scene.add(plane);
	directionalLight.add(sphere);
	scene.add(directionalLight);
	scene.add(boxGrid);

	
	var camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth/window.innerHeight,
		1,
		1000
	);
    
    // //first create a 3D group
    // var cameraZPosition = new THREE.Group();
    // //then add camera to the new group
    // cameraZPosition.add(camera);
    // //add it to the scene
    // scene.add(cameraZPosition);
    // //now create a gui for this controller
    // gui.add(cameraZPosition.position, 'z', 0, 100);

    //creating all axises
    var cameraYPosition = new THREE.Group();
    var cameraZRotation = new THREE.Group();
    var cameraZPosition = new THREE.Group();
    var cameraxRotation = new THREE.Group();
    var cameraYRotation = new THREE.Group();

    //giving name so that can be called easily from update function
    cameraYPosition.name = 'cameraYPosition';
    cameraZRotation.name = 'cameraZRotation';
    cameraZPosition.name = 'cameraZPosition';
    cameraxRotation.name = 'cameraxRotation';
    cameraYRotation.name = 'cameraYRotation';
    
    cameraZRotation.add(camera);
    cameraYPosition.add(cameraZRotation);
    cameraZPosition.add(cameraYPosition);
    cameraxRotation.add(cameraZPosition);
    cameraYRotation.add(cameraxRotation);   
    scene.add(cameraYRotation);

    //adding a intial value to positions
    cameraxRotation.rotation.x = - Math.PI / 2;
    cameraYPosition.position.y = 1;
    cameraZPosition.position.z = 100;

    //initializing tween method and providing obj
    //to method is for providing target value
    //sec arg of to is duration (in ms) of the animation
    //onupdate method we can update the variables we want
    //need to call start() to start the tween animation
    new TWEEN.Tween({val: 100}) //this is for zPos
        .to({val: -50}, 12000)
        .onUpdate(function(){
            cameraZPosition.position.z = this.val;
        })
        .start();

    new TWEEN.Tween({val: -Math.PI / 2})//this is for xRot
        .to({val: 0}, 6000)
        .delay(1000) //to use some delay to start
        .easing(TWEEN.Easing.Quadratic.InOut) //easing function
        .onUpdate(function(){
            cameraxRotation.rotation.x = this.val;
        })
        .start();

    new TWEEN.Tween({val: 0})//this is for xRot
        .to({val: Math.PI / 2}, 6000)
        .delay(1000) //to use some delay to start
        .easing(TWEEN.Easing.Quadratic.InOut) //easing function
        .onUpdate(function(){
            cameraYRotation.rotation.y = this.val;
        })
        .start();
    
    gui.add(cameraZPosition.position, 'z', 0, 100);
    gui.add(cameraYRotation.rotation, 'y', -Math.PI, Math.PI);
    gui.add(cameraxRotation.rotation, 'x', -Math.PI, Math.PI);
    gui.add(cameraZRotation.rotation, 'z', -Math.PI, Math.PI);

	camera.lookAt(new THREE.Vector3(0, 0, 0));

	var renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor('rgb(120, 120, 120)');
	document.getElementById('webgl').appendChild(renderer.domElement);

	var controls = new THREE.OrbitControls(camera, renderer.domElement);

	update(renderer, scene, camera, controls, clock);

	return scene;
}

function getBox(w, h, d) {
	var geometry = new THREE.BoxGeometry(w, h, d);
	var material = new THREE.MeshPhongMaterial({
		color: 'rgb(120, 120, 120)'
	});
	var mesh = new THREE.Mesh(
		geometry,
		material 
	);
	mesh.castShadow = true;

	return mesh;
}

function getBoxGrid(amount, separationMultiplier) {
	var group = new THREE.Group();

	for (var i=0; i<amount; i++) {
		var obj = getBox(1, 3, 1);
		obj.position.x = i * separationMultiplier;
		obj.position.y = obj.geometry.parameters.height/2;
		group.add(obj);
		for (var j=1; j<amount; j++) {
			var obj = getBox(1, 3, 1);
			obj.position.x = i * separationMultiplier;
			obj.position.y = obj.geometry.parameters.height/2;
			obj.position.z = j * separationMultiplier;
			group.add(obj);
		}
	}

	group.position.x = -(separationMultiplier * (amount-1))/2;
	group.position.z = -(separationMultiplier * (amount-1))/2;

	return group;
}

function getPlane(size) {
	var geometry = new THREE.PlaneGeometry(size, size);
	var material = new THREE.MeshPhongMaterial({
		color: 'rgb(120, 120, 120)',
		side: THREE.DoubleSide
	});
	var mesh = new THREE.Mesh(
		geometry,
		material 
	);
	mesh.receiveShadow = true;

	return mesh;
}

function getSphere(size) {
	var geometry = new THREE.SphereGeometry(size, 24, 24);
	var material = new THREE.MeshBasicMaterial({
		color: 'rgb(255, 255, 255)'
	});
	var mesh = new THREE.Mesh(
		geometry,
		material 
	);

	return mesh;
}

function getPointLight(intensity) {
	var light = new THREE.PointLight(0xffffff, intensity);
	light.castShadow = true;

	return light;
}

function getSpotLight(intensity) {
	var light = new THREE.SpotLight(0xffffff, intensity);
	light.castShadow = true;

	light.shadow.bias = 0.001;
	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048;

	return light;
}

function getDirectionalLight(intensity) {
	var light = new THREE.DirectionalLight(0xffffff, intensity);
	light.castShadow = true;

	light.shadow.camera.left = -40;
	light.shadow.camera.bottom = -40;
	light.shadow.camera.right = 40;
    light.shadow.camera.top = 40;
    
    light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.heigth = 4096;

	return light;
}

function update(renderer, scene, camera, controls, clock) {
	renderer.render(
		scene,
		camera
	);

    controls.update();
    TWEEN.update();

    var timeElapsed = clock.getElapsedTime();
    //calling the cameraZRotation to update
    var cameraZRotation = scene.getObjectByName('cameraZRotation');
    cameraZRotation.rotation.z = noise.simplex2(timeElapsed * 1.5, timeElapsed * 1.5) * 0.1;

	var boxGrid = scene.getObjectByName('boxGrid');
	boxGrid.children.forEach(function(child, index) {
		var x = timeElapsed + index;
		child.scale.y = (noise.simplex2(x, x) + 1) / 2 + 0.001;
		child.position.y = child.scale.y/2;
	});

	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls, clock);
	})
}

var scene = init();