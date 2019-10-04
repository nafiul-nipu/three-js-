function init(){
    var scene = new THREE.Scene();
    //three js camera needs some parameters to be set
    //field of view, aspect ratio, near clipping plane, far clipping plane
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
    //need rendered to see 
    var renderer = new THREE.WebGLRenderer();
    //renderer size shoul be set then
    renderer.setSize(window.innerWidth, window.innerHeight);
    //need to inside renderer to domElement
    document.getElementById('webgl').appendChild(renderer.domElement);
    //render it
    renderer.render(scene, camera);
}
init();
