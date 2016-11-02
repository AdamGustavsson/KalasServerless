import React, { Component, PropTypes } from 'react';
import {RIEInput, RIETextArea} from 'riek';
export default class EditablePartyField extends Component {

  render() {
    var { value } = this.props;
    value = value.replace(/&#13/g,'\n');
    const { theme } = this.props;
    const { editEnabled } = this.props;
    const { change } = this.props;
    const { isTextArea } = this.props;
    const { propName } = this.props;
    const { validate } = this.props;
       if(editEnabled){
          if(isTextArea) {
            return (<RIETextArea
              value={value}
              change={change}
              propName={propName}
              validate={validate}
              classEditing={"inline-edit inline-edit-"+theme}/>)
          }
          else {
            return (<RIEInput
             value={value}
             change={change}
             propName={propName}
             validate={validate}
             classEditing={"inline-edit inline-edit-"+theme}/>)
          }

      } else {
        const spans_and_brs = []
        let i = 0
        value.split("\n").map(line => {
          spans_and_brs.push(<span key={i}>{line}</span>)
          spans_and_brs.push(<br key={i+1} />)
          i += 2
        })
        spans_and_brs.pop() // remove last br tag

        return <span style={{display:"inline"}}>{spans_and_brs}</span>;
      }
    }
}
