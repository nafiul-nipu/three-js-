//3d objects in 3js are made of two things
//geometry that define the shape of the object
//material - surface quality , appearance of the object
//combination of these two makes up a mesh in three.js
//to update the background color of a scene we need to update renderer
//light types - PointLight - light bulb -- see getPointLight()
//MeshBasicMaterial() - is a self illuminating object
//MeshPhongMaterial() - is not so it needs light
//orbit controls initiating - using camera and renderer domElement 
//for shadows- first need to tell renderer to start rendering shadows
//then tell light to cast shadows
//tell object to cast or receive shadows
//go to getDirectionalLight()
function init(){
    var scene = new THREE.Scene();
    //initializing dat.gui
    var gui = new dat.GUI();

    var enableFog = false;
    if(enableFog){
        //adding fog property
        //FogExp2 properties
        //new THREE.FogExp2(<color>, <density>);
        scene.fog = new THREE.FogExp2(0xffffff, 0.2);
    }

    //creating object by calling getBox()
    //var box = getBox(1, 1, 1);
    //creating plane bye calling getPlane()
    var plane = getPlane(30);
    //creating light
    var directionalLight = getDirectionalLight(1);
    //creating sphere
    var sphere = getSphere(0.05);
    //creating multiple boxes
    var boxGrid = getBoxGrid(10, 1.5);
    //creating camera helper
    var helper = new THREE.CameraHelper(directionalLight.shadow.camera);
    //creating ambient light
    var ambientLight = getAmbientLight(5);

    //can give name to objects so that we can call it from parent 
    plane.name = 'Plane-1';

    //making box out of the plane
    //box.position.y = box.geometry.parameters.height / 2 ;
    //rotating the plane by 90 degree to x axis
    //three.js works radiant. in radiant 90 degree = pi/2
    plane.rotation.x = Math.PI / 2 ;
    //change light position
    directionalLight.position.x = 13 ;
    directionalLight.position.y = 10 ;
    directionalLight.position.z = 10 ;
    //changing the intensity 
    directionalLight.intensity = 2;

    //creating a user interface controller for intensity using dat.gui
    //it takes 4 parameters- objects that we like to control, the property of the object that to be controlled
    //minimum value and maximum value for the property
    gui.add(directionalLight, 'intensity', 0, 10);
    gui.add(directionalLight.position, 'x', 0, 20);
    gui.add(directionalLight.position, 'y', 0, 20);
    gui.add(directionalLight.position, 'z', 0, 20);  

    
    //adding everything to scene to visualize
    //scene.add(box);    
    scene.add(plane);
    directionalLight.add(sphere);
    scene.add(directionalLight);
    scene.add(boxGrid);
    scene.add(helper);
    scene.add(ambientLight);

    //three js camera needs some parameters to be set
    //field of view, aspect ratio, near clipping plane, far clipping plane
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
    
    //changing camera position to see the object
    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;

    //changing the camera look at. it will put the object to the center
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    //need rendered to see 
    var renderer = new THREE.WebGLRenderer();
    //telling rendered to map shadows
    renderer.shadowMap.enabled = true;
    //renderer size should be set then
    renderer.setSize(window.innerWidth, window.innerHeight);
    //changing backgroung color of scene using setClearColor(<color>);
    //renderer.setClearColor(0xffffff);
    //using css color properties for color
    //renderer.setClearColor('#ffffff');
    renderer.setClearColor('rgb(120, 120, 120)');
    //need to inside renderer to domElement
    document.getElementById('webgl').appendChild(renderer.domElement);

    //initiating OrbitControl
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    update(renderer, scene, camera, controls);

    return scene;
    

}

function getBox(w, h, d){
    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshPhongMaterial({color: 'rgb(120, 120, 120)'});
    var mesh = new THREE.Mesh(geometry, material);
    //telling to cast shadow
    mesh.castShadow = true;

    return mesh;

}
//creating many box objects
//creates the desire amount of boxes with a given separation value
function getBoxGrid(amount, seperationMultiplier){
    //group is non geometric object used for organizing other objects together - like a html div
    var group = new THREE.Group();

    for (var i = 0 ; i < amount ; i++){
        var obj = getBox(1, 1, 1);
        obj.position.x = i * seperationMultiplier;
        obj.position.y = obj.geometry.parameters.height/2;
        group.add(obj);
        for (var j = 1 ; j < amount ; j++){
            var obj = getBox(1, 1, 1);
            obj.position.x = i * seperationMultiplier;
            obj.position.y = obj.geometry.parameters.height / 2;
            obj.position.z = j * seperationMultiplier;
            group.add(obj);
        }
    }
    group.position.x = - (seperationMultiplier * (amount - 1)) / 2;
    group.position.z = - (seperationMultiplier * (amount - 1)) / 2;

    return group;
}

function getPlane(size){
    //PlaneGeometry(width, depth)
    var geometry = new THREE.PlaneGeometry(size, size)
    //side: THREE.DoubleSide is used for showing 2D plane
    var material = new THREE.MeshPhongMaterial({color: 'rgb(120, 120, 120)' , side: THREE.DoubleSide});
    var mesh = new THREE.Mesh(geometry, material);
    //telling to receive a shadow
    mesh.receiveShadow = true;

    return mesh;
}

function getSphere(radius){
    //SphereGeometry(<radius>, <width segment values>, <height segment values>)
    //segment values are like resolution of a geometry
    var geometry = new THREE.SphereGeometry(radius, 24, 24);
    var material = new THREE.MeshBasicMaterial({color: 'rgb(255, 255, 255)'});
    var mesh = new THREE.Mesh(geometry, material);

    return mesh;

}

function getPointLight(intensity){
    //PointLight takes two arguments
    //color of the light , intensity
    var light = new THREE.PointLight(0xffffff, intensity);
    //telling light to cast shadow
    light.castShadow = true;

    return light;
}

function getSpottLight(intensity){
    //SpotLight takes arguments and others same as Spotlight
    //color of the light , intensity
    var light = new THREE.SpotLight(0xffffff, intensity);
    //telling light to cast shadow
    light.castShadow = true;

    //changing the shadow bias value so that there is not line in the shadow
    light.shadow.bias = 0.001;

    //making blurry shadow go away to update the resolution
    //it may have some performance implication as updating to higher resolution may cost computation
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    return light;
}

function getDirectionalLight(intensity){
    //same as pointLight
    //color of the light , intensity
    var light = new THREE.DirectionalLight(0xffffff, intensity);
    //telling light to cast shadow
    light.castShadow = true;
    //setting attribute for the shadow camera more than the default values so that we can see all shadows
    light.shadow.camera.left = -10;
    light.shadow.camera.bottom = -10;
    light.shadow.camera.right = 10;
    light.shadow.camera.tio = 10;


    return light;
}

function getAmbientLight(intensity){
    //same as pointLigh
    //color of the light , intensity
    var light = new THREE.PointLight('rgb(10, 30, 50)', intensity);
    //ambient light does not  cast shadow
    //light.castShadow = true;

    return light;
}


function update(renderer, scene, camera, controls){
    //render it
    renderer.render(scene, camera);

    //to control the orbit control need to call update() from controls
    controls.update();
    
    requestAnimationFrame(function(){
        update(renderer, scene, camera, controls);
    });

}
var scene = init();

