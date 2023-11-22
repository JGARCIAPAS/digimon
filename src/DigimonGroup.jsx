import { Component } from "react";
import PropTypes from "prop-types";
import DigimonModal from "./DigimonModal";

class DigimonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showModal: false,
      selectedDigimon: null,
    };
  }

  componentDidMount() {
    fetch(
      `https://digimon-api.vercel.app/api/digimon/level/${this.props.level}`
    )
      .then((response) => {
        if (!response.ok) {
          console.log("response error");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ data: data });
      })
      .catch((error) => {
        console.error("fetch error", error);
      });
  }
  openModal = (digimon) => {
    this.setState({ showModal: true, selectedDigimon: digimon });
  };
  closeModal = () => {
    this.setState({ showModal: false, selectedDigimon: null });
  };
  render() {
    return (
      <>
        <div>
          <h1>Digimon Group: Fresh</h1>
          <ul>
            {this.state.data.map((creature, index) => (
              <li key={index} onClick={() => this.openModal(creature)}>
                <p>{creature.name}</p>
                <picture>
                  <source srcSet={creature.img}></source>
                  <img src={creature.img} className="creature-main-image" />
                </picture>
              </li>
            ))}
          </ul>
        </div>

        {this.state.showModal && (
          <DigimonModal
            onClose={this.closeModal}
            selectedDigimon={this.state.selectedDigimon}
          />
        )}
      </>
    );
  }
}

DigimonGroup.propTypes = {
  level: PropTypes.string.isRequired,
};

export default DigimonGroup;
