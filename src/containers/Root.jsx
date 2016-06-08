import React from 'react'
import CircleCropImg from '../components/CircleCropImg'

export default (props) => {

  window.props = props

  return (
    <div className="root">
      <img className="mainLogo" src="./cube01coloredTweaked.svg" />
      <div className="header">
        <div className="headerText">
          <h1>8balloon</h1>
          <h2>dev by Ethan Gregory Clark</h2>
        </div>
      </div>
      <div className="previewBox">
        <CircleCropImg src="./cube01coloredTweaked.svg" />
        <CircleCropImg src="./picqDemoScreenshot.PNG" />
        <CircleCropImg src="./cunigDemoScreenshot.PNG" />
      </div>
    </div>
  )
}
