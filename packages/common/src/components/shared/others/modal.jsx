import React from 'react';

class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
    }
  }
  componentDidMount() {
    const modalContainer = document.getElementById('videoModal');
    const config = { attributes: true, childList: false, subtree: false }
    const callback = (mutationList, observer) => {
      for (let mutation of mutationList) {
        if (mutation.attributeName === 'class') {
          const showModelContent= (mutation.target.className.indexOf('show') !== -1)? true:false 
          this.setState({
            show :showModelContent
          });
        }
      }
    }
    this.observer = new MutationObserver(callback)
    this.observer.observe(modalContainer, config)
  }
  componentWillUnmount() {
    this.observer.disconnect();
  }
  render() {
    const { title, children, onClose = () => { } } = this.props;
    const { show } = this.state;
    return (
      <div
        className="modal fade"
        id="videoModal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{ maxWidth: "60%" }}
        >
          <div
            className="modal-content"
          >
            <div className="modal-header">
              <h5 className="modal-title" >{title}</h5>
              <button
                id="close-modal"
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {
                show &&
                children
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;