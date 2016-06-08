var MouseInput = {

  x: 0,
  y: 0,
  click: false,

  init: function() {

    var havePointerLock = 'pointerLockElement' in document ||
        'mozPointerLockElement' in document ||
            'webkitPointerLockElement' in document;

    if ( !havePointerLock ) alert( 'Please upgrade your browser to a recent version of Chrome or Firefox to play.' )

    document.body.requestPointerLock = document.body.requestPointerLock ||
               document.body.mozRequestPointerLock ||
                         document.body.webkitRequestPointerLock;

    //this is the main "action" function
    document.body.onclick = lockingOnClick
    
    function lockingOnClick() {
        
      document.body.requestPointerLock()

      function moveCallBack(e) {

        //console.log(e)

        MouseInput.x += e.movementX
        MouseInput.y += e.movementY

      }

      document.addEventListener( 'mousemove', moveCallBack, false )

      document.body.onclick = playingOnClick

    }

    function playingOnClick(e) {

      console.log(e)

      MouseInput.click = true

    }

  },

  getInputs: function() {

    var x = MouseInput.x
    var y = MouseInput.y
    var c = MouseInput.click

    MouseInput.x = 0
    MouseInput.y = 0
    MouseInput.click = false

    return [ x, y, c ]

  }

}

if ( typeof module === 'object' ) module.exports = MouseInput
