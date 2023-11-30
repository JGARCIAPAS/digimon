import { Component } from "react";
import PropTypes from "prop-types";

class ModalHeader extends Component {
  render() {
    return (
      <div className="modal-header">
        <div className="modal-title">
          <span>Digidex v1.0</span>
          <div className="modal-close" onClick={this.props.onClose}></div>
        </div>
        <div className="modal-toolbar">
          <div className="modal-address-bar">
            <div className="modal-header-label">URL</div>
            <div className="modal-header-field">
              <span>https://www.digidex.com/{this.props.digimonName}</span>
            </div>
          </div>
          <div className="modal-favs-bar"></div>
          <div className="modal-browser-logo">
            <div className="logo-browser"></div>
          </div>
        </div>
        <div className="modal-divider"></div>
      </div>
    );
  }
}
ModalHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
  digimonName: PropTypes.string.isRequired,
};
export default ModalHeader;
