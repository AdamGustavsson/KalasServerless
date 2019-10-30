import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ArcText from 'arc-text'

export default class ReactArcText extends Component {
  static propTypes = {
    text: PropTypes.string,
    class: PropTypes.string,
    direction: PropTypes.number,
    arc: PropTypes.number
  }

  checkProps = () => {
    this.text = this.props.text || ''
    this.direction = this.props.direction || 1
    this.arc = this.props.arc || 150
    this.class = this.props.class || ''
  }

  arcLetters = () => {
    this.checkProps()
    //console.log("first arcing letters " + this.text)
    if (this.container) {
      if (this.textCyrcle) {
        this.textCyrcle.destroy()
      }
      console.log("arcing letters " + this.text)
      this.container.innerHTML = this.text
      this.textCyrcle = new ArcText(this.container)
      this.textCyrcle.arc(this.arc)
      this.textCyrcle.direction(this.direction) 
    }
   else
   {
     //console.log("not arcing letters " + this.text)
   }
  }

  componentDidMount() {
    //console.log("component did mount " +this.text)
    this.arcLetters()
  }

  render() {
    //console.log("rendering arcing " +this.text)
    this.arcLetters()
    //console.log("after arcing " +this.text)
    return (
      <div className={'react-arc-text ' + this.class} ref={(el) => { this.container = el }} />
    )
  }
}