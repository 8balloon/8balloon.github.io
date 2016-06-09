(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var constants = {
    
    G: 0.001,
    hz: 60,
    mouseSensitivity: 0.001
    
}

var mouseInput = {
    
    deltaX: 0,
    deltaY: 0,
    leftClick: false,

    init: function() {

        if ( !('pointerLockElement' in document) ) {

            alert ( 'Upgrade browser to (Chrome to) play.' )
            return

         }

        document.body.onclick = function() {

            document.body.requestPointerLock()

            document.body.onclick = function() {

                mouseInput.leftClick = true

            }

        }

        document.addEventListener( 'mousemove', function(e) {

            mouseInput.deltaX += e.movementX
            mouseInput.deltaY += e.movementY

        }, false )

    },
    
    get: function() {
        
        var ret = [ mouseInput.deltaX, mouseInput.deltaY, mouseInput.leftClick ]
        
        mouseInput.deltaX = 0
        mouseInput.deltaY = 0
        mouseInput.leftClick = false
        
        return ret
        
    }
    
}

var keyBoardInput = {
    
    left: false,
    right: false,
    up: false,
    down: false,
    space: false,
    x: false,
    
    init: function() {
        
        document.onkeydown = function( e ) {

            switch ( e.keyCode ) {

                //left arrow
                case 37:
                    keyBoardInput.left = true;
                    break;
                //'a' key
                case 65:
                    keyBoardInput.left = true;
                    break;

                //right arrow
                case 39:
                    keyBoardInput.right = true;
                    break;
                //'d' key
                case 68:
                    keyBoardInput.right = true;
                    break;

                //up arrow
                case 38:
                    keyBoardInput.up = true;
                    break;
                //'w' key
                case 87:
                    keyBoardInput.up = true;
                    break;

                //down arrow
                case 40:
                    keyBoardInput.down = true;
                    break;
                //'s' key
                case 83:
                    keyBoardInput.down = true;
                    break;

                //space bar
                case 32:
                    keyBoardInput.space = true;
                    break;
                    
                //'x' key
                case 88:
                    keyBoardInput.x = true;
                    break;

            }

        }

        document.onkeyup = function( e ) {

            switch ( e.keyCode ) {

                //left arrow
                case 37:
                    keyBoardInput.left = false;
                    break;
                //'a' key
                case 65:
                    keyBoardInput.left = false;
                    break;

                //right arrow
                case 39:
                    keyBoardInput.right = false;
                    break;
                //'d' key
                case 68:
                    keyBoardInput.right = false;
                    break;

                //up arrow
                case 38:
                    keyBoardInput.up = false;
                    break;
                //'w' key
                case 87:
                    keyBoardInput.up = false;
                    break;

                //down arrow
                case 40:
                    keyBoardInput.down = false;
                    break;
                //'s' key
                case 83:
                    keyBoardInput.down = false;
                    break;

                //space bar
                case 32:
                    keyBoardInput.space = false;
                    break;

                //'x' key
                case 88:
                    keyBoardInput.x = false;
                    break;

            }
        
        }
        
    },
    
    get: function() {
        
        return [ Number(keyBoardInput.right) - Number(keyBoardInput.left), Number(keyBoardInput.up) - Number(keyBoardInput.down), Number(keyBoardInput.space) - Number(keyBoardInput.x) ]
    
    },

    getNorm: function() {
        
        var get = keyBoardInput.get()
        
        //Tt would be Math.pow(get[n]) instead of Math.abs, but n===(-1||0||1), so abs is more efficient.
        var coeff = Math.sqrt( Math.abs( get[0] ) + Math.abs( get[1] ) + Math.abs( get[2] ) )
        
        if ( coeff ) for ( var i = 0; i < 3; get[i++]/=coeff ) ;
        
        return get
        
    }
    
}

var gravity = {
    
    center: null,
    
    init: function(obj) {
        
        gravity.center = obj
        
    },
    
    get: function(obj) {
    //Returns a functions gravity vector, which is a unit vector of accelerations.
        
        var dx = gravity.center.position.x - obj.position.x
        var dy = gravity.center.position.y - obj.position.y
        var dz = gravity.center.position.z - obj.position.z
        
        var f = ( obj.m * gravity.center.m * constants.G ) / ( 
            Math.pow( dx, 2 ) + 
            Math.pow( dy, 2 ) + 
            Math.pow( dz, 2 ) + 1 )
        
        return f
        
    }
    
}


function main() {
    
    var scene = new THREE.Scene();
    console.log(scene)
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    
    cube.m = 666
    gravity.init( cube )
    
    scene.add( cube );

    camera.position.z = 5;

    var render = function () {
        requestAnimationFrame( render );

        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;

        renderer.render(scene, camera);
    };

    render();
    
    console.log( gravity.get({
        m: 22, 
        position: {
            x: 10,
            y: 10,
            z: 10
        }
    }) )


    mouseInput.init()
    
    keyBoardInput.init()
    
}

main()
},{}]},{},[1]);
