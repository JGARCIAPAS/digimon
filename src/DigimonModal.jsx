import { Component } from "react";
import PropTypes from "prop-types";
import ModalFooter from "./assets/modalComponents/ModalFooter";
import ModalHeader from "./assets/modalComponents/modalHeader";
import ModalLoading from "./assets/modalComponents/ModalLoading";
import ModalNoData from "./assets/modalComponents/ModalNoData";
import EvolutionTable from "./assets/modalComponents/EvolutionTable";

class DigimonModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorName: false,
      id: 0,
      name: "",
      releaseDate: "",
      attributes: [],
      description: "",
      fields: [],
      image: "",
      levels: [],
      nextEvolutions: [],
      priorEvolutions: [],
      skills: [],
      types: [],
      xAntibody: false,
    };
  }
  componentDidMount() {
    const creature = this.props.selectedDigimon.name;
    fetch(`https://www.digi-api.com/api/v1/digimon/${creature}`)
      .then((response) => {
        if (!response.ok) {
          console.log("response error");
          this.setState({ errorName: true });
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          id: data.id,
          name: data.name,
          releaseDate: data.releaseDate,
          xAntibody: data.xAntibody,
          attributes: data.attributes,
          description: data.descriptions[0].description,
          fields: data.fields,
          image: data.images[0].href,
          levels: data.levels,
          nextEvolutions: data.nextEvolutions,
          priorEvolutions: data.priorEvolutions,
          skills: data.skills,
          types: data.types,
        });
        console.log(data);
      })
      .catch((error) => {
        console.error("fetch error", error);
      });
  }

  render() {
    return (
      <div className="modal-background">
        <div className="modal-content">
          <ModalHeader
            onClose={this.props.onClose}
            digimonName={this.props.selectedDigimon.name}
          />
          {this.state.errorName ? (
            <ModalNoData />
          ) : (
            <div>
              {!this.state.image ? (
                <ModalLoading />
              ) : (
                <div className="modal-body info-digimon">
                  <section className="left-side-info">
                    <h3 className="info-name">
                      #{this.state.id} - {this.props.selectedDigimon.name}
                    </h3>
                    <img className="info-img" src={this.state.image} />
                    <div className="info-fields">
                      {this.state.fields.map((field, index) => (
                        <div className="info-each-field" key={index}>
                          <img
                            src={field.image}
                            alt={field.field}
                            title={field.field}
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                  <section className="right-side-info">
                    <div className="info-levels">
                      {this.state.levels.map((level, index) => (
                        <div key={index}>
                          <p>{level.level}</p>
                        </div>
                      ))}
                    </div>
                    <p className="info-description">{this.state.description}</p>
                    <div className="info-more-data">
                      <div className="info-type">
                        {this.state.types.map((type, index) => (
                          <div key={index}>
                            <p>Digimon {type.type}</p>
                          </div>
                        ))}
                      </div>
                      <div className="info-statics">
                        <p className="statics-title">types</p>
                        {this.state.attributes.map((atr, index) => (
                          <div key={index}>
                            <p>{atr.attribute}</p>
                          </div>
                        ))}
                      </div>
                      <div className="info-statics">
                        <p className="statics-title">attacks</p>
                        {this.state.skills.map((skill, index) => (
                          <div key={index}>
                            <p>{skill.skill}</p>
                            {/*    <p>{skill.description}</p> */}
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                  <section className="tables">
                    <div className="info-table-title">possible evolutions</div>
                    <EvolutionTable evolutions={this.state.nextEvolutions} />
                    <div className="info-table-title">evolve from</div>
                    <EvolutionTable evolutions={this.state.priorEvolutions} />
                  </section>
                </div>
              )}
            </div>
          )}
          <ModalFooter />
        </div>
      </div>
    );
  }
}

DigimonModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedDigimon: PropTypes.object.isRequired,
};
export default DigimonModal;
