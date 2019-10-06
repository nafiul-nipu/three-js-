/**
 * some of the code of 31,32 are deleted out for this 
 stats.js
 */
function init() {
    var scene = new THREE.Scene();
    //initialize stats
    var stats = new Stats();
    //need to append the dom element for this library into the body of our HTML document as well.
    document.body.appendChild(stats.dom);

	// camera
	var camera = new THREE.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		1, // near clipping plane
		1000 // far clipping plane
	);
	camera.position.z = 30;
	camera.position.x = 0;
	camera.position.y = 20;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    //creating particle geometry
    var particleGeo = new THREE.SphereGeometry(10, 64, 64);

    particleGeo.vertices.forEach(function(vertex){
        vertex.x += (Math.random() - 0.5);
        vertex.y += (Math.random() - 0.5);
        vertex.z += (Math.random() - 0.5);
    });
    //creating particle material which is PointsMaterial
    //two arg - color, size of the particle
    var particleMat = new THREE.PointsMaterial({
        color: 'rgb(25, 255, 255)', 
        size: 0.25,
        //changing the map property of pointsMaterial
        //and adding textures
        map : new THREE.TextureLoader().load('particles.png'),
        //with transparency on a texture that has a black background,
        // I should also set the blending mode to Three.js additive
        // blending.
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    
    //create the particle system
    var particleSystem = new THREE.Points(
        particleGeo,
        particleMat
    );
    particleSystem.name = 'particleSystem';
    //add it to the scene
    scene.add(particleSystem);

	// renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.setClearColor('rgb(20, 20, 20)');

	var controls = new THREE.OrbitControls( camera, renderer.domElement );

	document.getElementById('webgl').appendChild(renderer.domElement);

	update(renderer, scene, camera, controls, stats);

	return scene;
}


function update(renderer, scene, camera, controls, stats) {
    controls.update();
    stats.update();
    renderer.render(scene, camera);
    
    //for animating the particles
    var particleSystem = scene.getObjectByName('particleSystem');
    particleSystem.rotation.y += 0.005;
    	
	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls, stats);
	});
}

var scene = init();
