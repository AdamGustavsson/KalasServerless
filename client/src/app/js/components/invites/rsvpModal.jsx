import React from 'react';

class RsvpModal extends React.Component {
    componentDidMount() {
        document.addEventListener("click", this.handleOutsideClick.bind(this), false);
      }
    
    componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick.bind(this), false);
    } 
    handleOutsideClick(e) {
        const { onClose } = this.props;
    
        if (this.modal) {
          if (!this.modal.contains(e.target)) {
            onClose();
            document.removeEventListener("click", this.handleOutsideClick.bind(this), false);
          }
        }
      }
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 40
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 20
    };

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle} ref={node => (this.modal = node)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}



export default RsvpModal;