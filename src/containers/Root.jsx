import React from 'react'
import CircleCropImg from '../components/CircleCropImg'

import PreviewBoxItem from '../components/PreviewBoxItem'

export default (props) => {

  window.props = props

  return (
    <div className="root">
      <img className="mainLogo" src="cube01coloredTweaked.svg" />
      <div className="header">
        <div className="headerText">
          <h1>8balloon</h1>
          <h2>dev by Ethan Gregory Clark</h2>
        </div>
      </div>
      <div className="previewBox">
        <PreviewBoxItem src="stringBeanDemoScreenshot.PNG">
          fpoo
        </PreviewBoxItem>
        <PreviewBoxItem src="picqDemoScreenshot.PNG">
          fpoo
        </PreviewBoxItem>
      </div>
      <div className="previewBox">
        <PreviewBoxItem src="resumeScreenshot.PNG">
          fpoo
        </PreviewBoxItem>
        <PreviewBoxItem src="cunigDemoScreenshot.PNG">
          fpoo
        </PreviewBoxItem>
      </div>
    </div>
  )
}
