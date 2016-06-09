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
        <PreviewBoxItem
            href="Ethan_Clark_resume_2016_g_public.pdf"
            src="resumeScreenshot.PNG">
          resume
        </PreviewBoxItem>
        <PreviewBoxItem
            href="http://8balloon.com/picq/demo"
            src="picqDemoScreenshot.PNG">
          advertising app demo
        </PreviewBoxItem>
      </div>
      <div className="previewBox">
        <PreviewBoxItem
            href="http://8balloon.com/cunig/demo"
            src="cunigDemoScreenshot.PNG">
          3d-gravity game demo
        </PreviewBoxItem>
        <PreviewBoxItem
            href="https://8balloon.github.io/college/stringbean"
            src="stringBeanDemoScreenshot.PNG">
          (old) word art demo
        </PreviewBoxItem>
      </div>
    </div>
  )
}
