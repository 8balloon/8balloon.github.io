(function(){

// Rotate an object around an arbitrary axis in object space
var rotObjectMatrix;
function rotateAroundObjectAxis(object, axis, radians) {
    rotObjectMatrix = new THREE.Matrix4();
    rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

    object.matrix.multiply(rotObjectMatrix);

    object.rotation.setFromRotationMatrix(object.matrix);
}

var rotWorldMatrix;
// Rotate an object around an arbitrary axis in world space
function rotateAroundWorldAxis(object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

    rotWorldMatrix.multiply(object.matrix);                // pre-multiply

    object.matrix = rotWorldMatrix;

    object.rotation.setFromRotationMatrix(object.matrix);
}

var constants = {

    defaultParams: {},
    G: 0.00001,
    hz: 60,
    mouseSensitivity: 0.01,
    dragCoeff: 0.99,

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

    },

    applyNorm: function(cam) {

        var MI = mouseInput.get()

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

function makeReal(obj3) {
    //Where obj3 is a three.js object.
    obj3.m = 1
    obj3.dx = 0
    obj3.dy = 0
    obj3.dz = 0
}

function move(obj) {
    /*
    obj.translateX( obj.dx )
    obj.translateY( obj.dy )
    obj.translateZ( obj.dz )
    */
    obj.position.x += obj.dx
    obj.position.y += obj.dy
    obj.position.z += obj.dz
    obj.updateMatrix()

    obj.dx *= constants.dragCoeff
    obj.dy *= constants.dragCoeff
    obj.dz *= constants.dragCoeff
    /*
    obj.dx = 0
    obj.dy = 0
    obj.dz = 0
    */
}

function distance( vec3a, vec3b ) {
  return Math.sqrt(
      Math.pow( vec3b.x - vec3a.x, 2 ) +
      Math.pow( vec3b.y - vec3a.y, 2 ) +
      Math.pow( vec3b.z - vec3a.z, 2 )
    )
}

var polarMove = { //NOT DONE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  origin: null,

  init: function( obj3 ) {

    polarMove.origin = obj3

  },

  move: function( obj3, x, y, z ) {

    var orig = obj3.position.clone()

    obj3.translateX( x + obj3.dx )
    obj3.translateY( y + obj3.dy )
    obj3.translateZ( z + obj3.dz )

    obj3.dx *= constants.dragCoeff
    obj3.dx *= constants.dragCoeff
    obj3.dx *= constants.dragCoeff

    var diff = orig.sub( obj3.position )

    rotateAroundWorldAxis(
      obj3,
      diff.cross( obj3.position ),
      Math.atan(
        distance(
          orig, polarMove.origin
        )
        /
        distance(
          orig, obj3.position
        )
      )
    )
    //obj3.rotateOnAxis( diff.cross(obj3.up), Math.atan2( distance( orig, polarMove.origin ), distance( orig, obj3.position ) ) )

  }

}

var collisionHandler = {

    sites: {},

    add: function( obj ) {

        if ( collisionHandler.check( obj ) ) return false

        else {

            collisionHandler.sites[ String( [ Math.floor( obj.position.x ),
                                             Math.floor( obj.position.y ),
                                             Math.floor( obj.position.z ) ] ) ] = true

            return true
        }

    },

    check: function( obj ) {

        var coordString = String( [ Math.floor( obj.position.x ),
                                   Math.floor( obj.position.y ),
                                   Math.floor( obj.position.z ) ] )

        if ( collisionHandler.sites[ coordString ] ) return true
        else return false

    },

    handle: function( obj ) {

        if ( collisionHandler.check( obj ) ) {

            obj.dx = 0
            obj.dy = 0
            obj.dz = 0

        }

    }

}

var gravity = {

    center: null,
    magnitude: null,

    init: function( center ) {
        gravity.center = center
        gravity.magnitude = center.m * constants.G
    },

    pull: function( obj ) {

        var dx = gravity.center.position.x - obj.position.x
        var dy = gravity.center.position.y - obj.position.y
        var dz = gravity.center.position.z - obj.position.z

        var xyzMag = Math.sqrt( Math.pow( dx, 2 ) + Math.pow( dy, 2 ) + Math.pow( dz, 2 ) )

        obj.dx += ( dx / xyzMag * gravity.magnitude )
        obj.dy += ( dy / xyzMag * gravity.magnitude )
        obj.dz += ( dz / xyzMag * gravity.magnitude )

    }

}

function main() {

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth * 0.995, window.innerHeight * 0.995 );
  document.body.appendChild( renderer.domElement );

    var scene = new THREE.Scene();
    var cube = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial( { color: 0x00ff00 } ) )
    var xRep = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true}) )
    var yRep = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({color: 0x770077, wireframe: true}) )
    var zRep = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true}) )
    cube.add( xRep ); cube.add( yRep); cube.add( zRep);
    xRep.translateX(0.1); yRep.translateY(0.1); zRep.translateZ(0.1);
    scene.add( cube )
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
    var CoG = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) )
    //var balance = new THREE.Object3D()
    var balance = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } ) )
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    var foo = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true } ) )
    //balance.add( camera )
    camera.position.z = 20
    camera.updateMatrix()
    balance.add( foo )
    foo.position.x = 0.5
    foo.position.y = 1
    foo.position.z = 2
    foo.updateMatrix()
    scene.add( balance )
    //camera.position.z = 24
    balance.position.z = 12
    balance.updateMatrix()
    scene.add( CoG )

    makeReal( balance )
    makeReal( CoG )
    CoG.m = 500
    gravity.init( CoG )
    collisionHandler.add( CoG )

    camera.rx = 0

    mouseInput.init()
    keyBoardInput.init()

    var zVec = new THREE.Vector3( 0, 0, 1 )
    var yVec = new THREE.Vector3( 0, 1, 0 )
    var xVec = new THREE.Vector3( 1, 0, 0 )
    //camera.rotateOnAxis( xVec, Math.PI )

    polarMove.init( CoG )

    var render = function () {

        requestAnimationFrame( render );

        var MI = mouseInput.get()
        MI[0] *= -1 * constants.mouseSensitivity
        MI[1] *= -1 * constants.mouseSensitivity

        if ( camera.rx + MI[1] >= 0 ) {
          if ( camera.rx + MI[1] <= Math.PI ) {
            balance.rotateOnAxis( xVec, MI[1] )
            camera.rx += MI[1]
          }
        }
        //camera.rotateOnAxis( zVec, MI[0] )
        //camera.rotation.z += MI[0]
        camera.updateMatrix()




        var KI = keyBoardInput.getNorm()

        //rotate around center of gravity
        balance.rotateOnAxis( balance.up, MI[0] ) //KI[0]

        balance.translateX( KI[0] )

        //move forward/backward, linearly
        balance.translateY( KI[1] )

        //balance.translateX( KI[0] )
        balance.translateZ( KI[2] )

        gravity.pull( balance )
        //move( balance )
        polarMove.move( balance )

        balance.up.set(
            balance.position.x - CoG.position.x,
            balance.position.y - CoG.position.y,
            balance.position.z - CoG.position.z
          )
        balance.up.normalize()


        //balance.lookAt( CoG.position )

        collisionHandler.handle( balance )

        renderer.render(scene, camera);

    };
    render();



    this.THREE = THREE
    this.camera = camera
    this.CoG = CoG
    this.balance = balance
    this.scene = scene
    this.cube = cube

}

main()

}).call(this);
