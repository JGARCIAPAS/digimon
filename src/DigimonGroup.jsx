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
      `https://www.digi-api.com/api/v1/digimon?level=${this.props.level}&pageSize=1422`
      /*  `https://digimon-api.vercel.app/api/digimon/level/${this.props.level}` */
    )
      .then((response) => {
        if (!response.ok) {
          console.log("response error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.content);
        this.setState({ data: data.content });
        console.log("start digimon de cada nivel");
        console.log(this.state.data);
        console.log("end digimon de cada nivel");
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
          <h1>Digimon Group: {this.props.level}</h1>
          {
            <ul className="digimon-group">
              {this.state.data.map((creature, index) => (
                <li
                  key={index}
                  className="creature"
                  onClick={() => this.openModal(creature)}
                >
                  <p>{creature.name}</p>
                  <picture>
                    <source srcSet={creature.image}></source>
                    <img src={creature.image} className="creature-main-image" />
                  </picture>
                </li>
              ))}
            </ul>
          }
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
