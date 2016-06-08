var KeyBoardInput = require( './KeyBoardInput' )
var MouseInput = require( './MouseInput' )

var controlHz = 60
var mouseSensitivity = 0.001

var Controls = { 

  init: function( perspective ) {

    KeyBoardInput.init()
    MouseInput.init()

    //main control loop
    var controlInterval = setInterval( function() {

      var k3 = KeyBoardInput.getNormInputs()
      perspective.position.x += k3[0]
      perspective.position.y += k3[1]
      perspective.position.z += k3[2]
      perspective.updateMatrix()

      var m3 = MouseInput.getInputs()
      perspective.rotation.y -= m3[0] * mouseSensitivity
      perspective.rotation.x -= m3[1] * mouseSensitivity
      
      //camera.move
      
    }, 1000 / controlHz) 
    
          /*
          camera.rotation.x += 0.1
          camera.updateMatrix()
          */
    
    var testInterval = setInterval( function() {

      console.log(MouseInput.getInputs())

    }, 2000 )


  }

}

if ( typeof module === 'object' ) module.exports = Controls
