import React, { Component, PropTypes } from 'react';
import {RIEInput, RIETextArea} from 'riek';
export default class EditablePartyField extends Component {

  render() {
    const { value } = this.props;
    const { theme } = this.props;
    const { editEnabled } = this.props;
    const { change } = this.props;
    const { isTextArea } = this.props;
    const { propName } = this.props;
       if(editEnabled){
          if(isTextArea) {
            return (<RIETextArea
              value={value}
              change={change}
              propName={propName}
              classEditing={"inline-edit inline-edit-"+theme}/>)
          }
          else {
            return (<RIEInput
             value={value}
             change={change}
             propName={propName}
             classEditing={"inline-edit inline-edit-"+theme}/>)
          }

      } else {
        return (<div style={{display:"inline"}}>{value}</div>);
      }
    }
}
