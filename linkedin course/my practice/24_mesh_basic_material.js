/*
using new scene
materials the apperance of the object
this will be for all material examples
1. MeshBasicMaterial - The material is not affected by lighting at all,
so it always displays the given color, no matter what your scene lighting is.
2. MeshLambertMaterial - can be a suitable material to simulate nice, shiny surfaces, such as rubber, clay, or stone.
It uses a very simplistic shading model, which makes it very (speaks softly) but it might not yield the most accurate results.
3. MeshPhongMaterial - using a mesh Phong material can be a better choice, since it allows you to control the highlights on the material as well
Mesh Phong material has an attribute called "shininess," that describes how sharp the light reflections are on the material. 
Higher the value, sharper the reflections will be. Lower values can be good to simulate rough surfaces, 
whereas higher values would be better for simulating glossier surfaces, like metal.
4. MeshStandardMaterial -  is a physically based rendering material that can create much more realistic results compared to other materials 
This is the kind of material that modern game engines like Unreal or Unity use, and is an industry standard in gaming and visual effects.

*/
function init() {
	var scene = new THREE.Scene();
	var gui = new dat.GUI();

	// initialize objects 
	// //- for mesh Basic material
	// var sphereMaterial = getMaterial('basic', 'rgb(255, 0, 0)');
	// var sphere = getSphere(sphereMaterial, 1, 24);
	// var planeMaterial = getMaterial('basic', 'rgb(0, 0, 255)');
	// var plane = getPlane(planeMaterial, 30);

	// //- for mesh lambert material
	// var sphereMaterial = getMaterial('lambert', 'rgb(255, 255, 255)');
	// var sphere = getSphere(sphereMaterial, 1, 24);
	// var planeMaterial = getMaterial('lambert', 'rgb(255, 255, 255)');
	// var plane = getPlane(planeMaterial, 30);

	// //- for mesh phong material
	// var sphereMaterial = getMaterial('phong', 'rgb(255, 255, 255)');
	// var sphere = getSphere(sphereMaterial, 1, 24);
	// var planeMaterial = getMaterial('phong', 'rgb(255, 255, 255');
	// var plane = getPlane(planeMaterial, 30);

	//- for mesh standard material
	var sphereMaterial = getMaterial('standard', 'rgb(255, 255, 255)');
	var sphere = getSphere(sphereMaterial, 1, 24);
	var planeMaterial = getMaterial('standard', 'rgb(255, 255, 255)');
	var plane = getPlane(planeMaterial, 30);


	var lightLeft = getSpotLight(1, 'rgb(255, 220, 180)');
	var lightRight = getSpotLight(1, 'rgb(255, 220, 180)');

	// manipulate objects
	sphere.position.y = sphere.geometry.parameters.radius;
	plane.rotation.x = Math.PI/2;

	lightLeft.position.x = -5;
	lightLeft.position.y = 2;
	lightLeft.position.z = -4;

	lightRight.position.x = 5;
	lightRight.position.y = 2;
	lightRight.position.z = -4;

	// manipulate materials

	// dat.gui
	var folder1 = gui.addFolder('light_1');
	folder1.add(lightLeft, 'intensity', 0, 10);
	folder1.add(lightLeft.position, 'x', -5, 15);
	folder1.add(lightLeft.position, 'y', -5, 15);
	folder1.add(lightLeft.position, 'z', -5, 15);

	var folder2 = gui.addFolder('light_2');
	folder2.add(lightRight, 'intensity', 0, 10);
	folder2.add(lightRight.position, 'x', -5, 15);
	folder2.add(lightRight.position, 'y', -5, 15);
	folder2.add(lightRight.position, 'z', -5, 15);

	// //shininess controller -phong material
	// var folder3 = gui.addFolder('light_3');
	// folder3.add(sphereMaterial, 'shininess', 0, 1000);
	// folder3.add(planeMaterial, 'shininess', 0, 1000);
	// folder3.open()

	//standard material - controller does not have shininess controller
	//it takes roughness and roughness takes value between 0 and 1
	//lower value - sharper .. higher value - rougher
	//another parameter called metalness - 
	//it controls lighting and reflection distribution and controls how metallic an object looks
	var folder3 = gui.addFolder('light_3');
	folder3.add(sphereMaterial, 'roughness', 0, 1);
	folder3.add(planeMaterial, 'roughness', 0, 1);
	folder3.add(sphereMaterial, 'metalness', 0, 1);
	folder3.add(planeMaterial, 'metalness', 0, 1);
	folder3.open()


	// add objects to the scene
	scene.add(sphere);
	scene.add(plane);
	scene.add(lightLeft);
	scene.add(lightRight);

	// camera
	var camera = new THREE.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		1, // near clipping plane
		1000 // far clipping plane
	);
	camera.position.z = 7;
	camera.position.x = -2;
	camera.position.y = 7;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	// renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	document.getElementById('webgl').appendChild(renderer.domElement);
	
	var controls = new THREE.OrbitControls( camera, renderer.domElement );
	
	update(renderer, scene, camera, controls);

	return scene;
}

function getSphere(material, size, segments) {
	var geometry = new THREE.SphereGeometry(size, segments, segments);
	var obj = new THREE.Mesh(geometry, material);
	obj.castShadow = true;

	return obj;
}

function getMaterial(type, color) {
	var selectedMaterial;
	var materialOptions = {
		color: color === undefined ? 'rgb(255, 255, 255)' : color,
	};

	switch (type) {
		case 'basic':
			selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
			break;
		case 'lambert':
			selectedMaterial = new THREE.MeshLambertMaterial(materialOptions);
			break;
		case 'phong':
			selectedMaterial = new THREE.MeshPhongMaterial(materialOptions);
			break;
		case 'standard':
			selectedMaterial = new THREE.MeshStandardMaterial(materialOptions);
			break;
		default: 
			selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
			break;
	}

	return selectedMaterial;
}

function getSpotLight(intensity, color) {
	color = color === undefined ? 'rgb(255, 255, 255)' : color;
	var light = new THREE.SpotLight(color, intensity);
	light.castShadow = true;
	light.penumbra = 0.5;

	//Set up shadow properties for the light
	light.shadow.mapSize.width = 2048;  // default: 512
	light.shadow.mapSize.height = 2048; // default: 512
	light.shadow.bias = 0.001;

	return light;
}

function getPlane(material, size) {
	var geometry = new THREE.PlaneGeometry(size, size);
	material.side = THREE.DoubleSide;
	var obj = new THREE.Mesh(geometry, material);
	obj.receiveShadow = true;

	return obj;
}

function update(renderer, scene, camera, controls) {
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls);
	});
}

var scene = init();
