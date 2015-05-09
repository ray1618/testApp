/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var dir;
var xPosBtn=0;
var app = {
    // Application Constructor
    initialize: function() {
       this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*// COMPASS
        var watchID = navigator.compass.watchHeading(compassSuccess, compassError, compassOptions);
    
    
        function compassSuccess(heading){
            dir= Math.round(heading.magneticHeading);
            console.log(dir);
        }

        function compassError(heading){

        }

        var compassOptions = {
            frequency: 3000
        }; // Update every 3 seconds*/
        
        // ACCELLOMETER
        
        
        
         // var mh = Math.round(heading.magneticHeading);
    //arrow.style.webkitTransform = "rotate("+dir+"deg)";
       
    
        if (id==='deviceready'){
            klok = new initThreeJs(); 
        //console.log('water');
            
//            klok.move();
//            
//            $('.app').click(function(){
//                klok.move();
//            });
            //klok.reset();
        }
        
        $('.meer').click(function(){
            xPosBtn += Math.PI / 180;
        });
        
        $('.minder').click(function(){
            //if (xPosBtn > 0.1){
              xPosBtn -= Math.PI / 180; 
            //}
        });
        
        /*var options = {frequency:500}
        var watchId = navigator.compass.watchHeading(onSuccess, onError, options);
        
        function onSuccess(heading){
            var dir = Math.round(heading.magneticHeading);
            arrow.style.webkitTransform = "rotate("+dir+"deg)";
        };
        
        function onError(compassError){
            alert('compass error:'+compassError.code);   
        }*/
        
        
    }
};


initThreeJs = (function(){
    function initThreeJs(){
 var camera, camera2, scene, renderer, renderer2;
var geometry, material, mesh;
        
        var scene2, renderer2;
    

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 0;
    
    camera2 = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
    camera2.position.z = 0;

    scene = new THREE.Scene();
    //scene2 = scene.clone(new THREE.Scene); // works fine
    

   // geometry = new THREE.BoxGeometry(200, 200, 200);
    geometry = new THREE.SphereGeometry( 100 , 32, 32);
    /*material = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        wireframe: false
    });*/
    material = new THREE.MeshBasicMaterial({       
        wireframe: false
    })
    material.side = THREE.BackSide;
    material.shading = THREE.SmoothShading;
    
    material.map = THREE.ImageUtils.loadTexture('../img/360-01.RGB_color.0000.jpg');

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    //renderer.setViewport(0,0, window.innerWidth, window.innerHeight);
   // renderer.clear();
    

    document.body.appendChild(renderer.domElement);
    
    //view2
    /*renderer2 = new THREE.WebGLRenderer();
    scene2 = new THREE.Scene();
    scene2.add(mesh);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight/2);
    
    document.getElementById('view2').appendChild(renderer.domElement);*/
    
}

function animate() {
    var xPos, yPos, zPos;
    function accelerometerSuccess(acceleration){  
            xPos = Math.round(acceleration.x);
            yPos = Math.round(acceleration.y);
            zPos = Math.round(acceleration.z);
        /*
            var dir = 'Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n';*/
            //console.log(dir);
//        mesh.rotation.x = xPos/10;
        //mesh.rotation.x = 45*(Math.PI / 180);
        //camera.rotation.x = (-yPos)/10;
        //camera.rotation.x = xPosBtn;
//        camera.rotation.x = -90 * Math.PI / 180 ;
        zPos = (-zPos)*9;
        camera.rotation.x = zPos * Math.PI / 180 ;
        camera.rotation.y = xPosBtn;// zPos * Math.PI / 180 ;
        $('#console').html('X:'+xPos+'<br>Y:'+yPos+'<br>Z:'+zPos);
        
        requestAnimationFrame(animate);
        
        
        
        renderer.setViewport( 0, 0, window.innerWidth, window.innerHeight );
        renderer.clear();

        renderer.setViewport( 0, 0, 0.5 * window.innerWidth - 2, window.innerHeight );
        renderer.render( scene, camera );

        renderer.setViewport( 0.5 * window.innerWidth + 1, 0, 0.5 * window.innerWidth - 2, window.innerHeight - 2 );
        renderer.render( scene, camera2 );
       
        }
        
        function accelerometerError(){
            alert('error accelerator');
        }
        
        var watchId = navigator.accelerometer.getCurrentAcceleration(accelerometerSuccess, accelerometerError);
    
    
     //var mh = Math.round(heading.magneticHeading);
    //arrow.style.webkitTransform = "rotate("+dir+"deg)";
   
    
   

//    
   // mesh.rotation.y += 0.005;
//    mesh.rotation.x += 0.005;
  //  mesh.rotation.z += 0.005;
    
    // setViewport parameters:
	//  lower_left_x, lower_left_y, viewport_width, viewport_height
	
    
    //renderer.render(scene, camera);
//    renderer2.render(scene2, camera);

}
    }
    
    return initThreeJs;
})();

consoleTest = (function(msg){
    function consoleTest(msg){
        var console = document.getElementById("console").innerHTML;
        document.getElementById("console").innerHTML = console+"<br>"+msg;
    }
    
    consoleTest.prototype.log = function(msg){
        var console = document.getElementById("console").innerHTML;
        return document.getElementById("console").innerHTML = console+"<br>"+msg;
    }
    
    consoleTest.prototype.legen = function(){
        return document.getElementById("console").innerHTML = '';
    }
    
    return consoleTest;    
})()
