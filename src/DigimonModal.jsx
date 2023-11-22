import { Component } from "react";
import PropTypes from "prop-types";

class DigimonModal extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const creature = this.props.selectedDigimon.name;
    fetch(`https://www.digi-api.com/api/v1/digimon/${creature}`)
      .then((response) => {
        if (!response.ok) {
          console.log("response error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("fetch error", error);
      });
  }

  render() {
    return (
      <div>
        <h1>DIGIMON MODAL</h1>
        <span className="close-modal" onClick={this.props.onClose}>
          &times;
        </span>
        <h2>
          {this.props.selectedDigimon ? this.props.selectedDigimon.name : ""}
        </h2>
      </div>
    );
  }
}

DigimonModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedDigimon: PropTypes.object.isRequired,
};
export default DigimonModal;
