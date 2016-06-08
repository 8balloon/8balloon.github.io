//webpack: include css
function requireAll(r) { r.keys().forEach(r)}
requireAll(require.context('./', true, /s?css$/));

//hotcomponent path string
const rootPath = './Root'

import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

var updaters = {} //will hold the updaters of hot components
  , containers = require.context('./containers')

if (module.hot) { //hot load containers and update hot components
 module.hot.accept(containers.id, () => {
   containers = require.context('./containers')
   //call all updaters
   Object.keys(updaters).forEach((key) => {
     updaters[key]()
   })
 })
}

function HotComponent(relativePath) {
  return React.createClass({
    componentDidMount: function() {
      //set updater
      updaters[relativePath] = this.forceUpdate.bind(this)
    },
    render: function() {
      var Component = containers(relativePath)
      Component = //mutating for export vs module.exports check
        Component.default ? Component.default : Component
      return <Component {...this.props} />
    }
  })
}

ReactDOM.render(
  React.createElement(HotComponent(rootPath)),
  document.getElementById('react')
)
