import { Component } from "react";

class ModalLoading extends Component {
  render() {
    return (
      <div className="modal-body loading-screen">
        <img className="loading-crest" src="img/crest.svg" />
        <p className="loading-text">LOADING</p>
      </div>
    );
  }
}
export default ModalLoading;
