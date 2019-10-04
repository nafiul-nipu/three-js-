//3d objects in 3js are made of two things
//geometry that define the shape of the object
//material - surface quality , appearance of the object
//combination of these two makes up a mesh in three.js
function init(){
    var scene = new THREE.Scene();

    //creating object by calling getBox()
    var box = getBox(1, 1, 1);
    //creating plane bye calling getPlane()
    var plane = getPlane(4);
    //rotating the plane by 90 degree to x axis
    //three.js works radiant. in radiant 90 degree = pi/2
    plane.rotation.x = Math.PI / 2 ;
    //making box get out of the plane
    box.position.y = box.geometry.parameters.height / 2 ;

    //adding everything to scene to visualize
    scene.add(box);
    scene.add(plane);

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
    //renderer size should be set then
    renderer.setSize(window.innerWidth, window.innerHeight);
    //need to inside renderer to domElement
    document.getElementById('webgl').appendChild(renderer.domElement);

    update(renderer, scene, camera);

    return scene;
    

}

function getBox(w, h, d){
    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    var mesh = new THREE.Mesh(geometry, material);

    return mesh;

}

function getPlane(size){
    //PlaneGeometry(width, depth)
    var geometry = new THREE.PlaneGeometry(size, size)
    //side: THREE.DoubleSide is used for showing 2D plane
    var material = new THREE.MeshBasicMaterial({color: 0xff0000 , side: THREE.DoubleSide});
    var mesh = new THREE.Mesh(geometry, material);

    return mesh;
}

function update(renderer, scene, camera){
    //render it
    renderer.render(scene, camera);

    //recursively calling the update 
    //requestAnimaitonFrame() use to update the scene 60 times per second
    requestAnimationFrame(function(){
        update(renderer, scene, camera);
    });

}
var scene = init();