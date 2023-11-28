import { Component } from "react";
import PropTypes from "prop-types";

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
        console.log(this.state.types);
      })
      .catch((error) => {
        console.error("fetch error", error);
      });
  }

  render() {
    return (
      <div className="modal-background">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">
              <span>Digidex v1.0</span>
              <div className="modal-close" onClick={this.props.onClose}></div>
            </div>
            <div className="modal-toolbar">
              <div className="modal-address-bar">
                <div className="modal-header-label">URL</div>
                <div className="modal-header-field">
                  <span>sdkjfhjsfghdshfg</span>
                </div>
              </div>
              <div className="modal-favs-bar"></div>

              <div className="modal-browser-logo">
                <div className="logo-browser"></div>
              </div>
            </div>
            <div className="modal-divider"></div>
          </div>
          {this.state.errorName ? (
            <div className="modal-body">QUE MALA SUERTE CHATO</div>
          ) : (
            <div>
              {!this.state.image ? (
                <div className="modal-body">LOADING</div>
              ) : (
                <div className="modal-body">
                  <p className="digimon-name">
                    {this.props.selectedDigimon.name}
                  </p>
                  <p className="digimon-name">{this.state.name}</p>
                  <p className="digimon-name">{this.state.id}</p>
                  <p className="digimon-name">{this.state.releaseDate}</p>
                  <p className="digimon-name">{this.state.xAntibody}</p>
                  <p className="digimon-name">{this.state.description}</p>
                  <img src={this.state.image} />
                  <p className="digimon-name">atributos</p>
                  {this.state.attributes.map((atr, index) => (
                    <div key={index}>
                      <p>{atr.attribute}</p>
                    </div>
                  ))}
                  <p className="digimon-name">campos</p>
                  {this.state.fields.map((field, index) => (
                    <div key={index}>
                      <p>{field.field}</p>
                      <img src={field.image} />
                    </div>
                  ))}
                  <p className="digimon-name">niveles</p>
                  {this.state.levels.map((level, index) => (
                    <div key={index}>
                      <p>{level.level}</p>
                    </div>
                  ))}
                  <p className="digimon-name">posibles evoluciones</p>
                  {this.state.nextEvolutions.map((evol, index) => (
                    <div key={index}>
                      <p>{evol.id}</p>
                      <img src={evol.image} style={{ width: "10px" }} />
                      <p>{evol.digimon}</p>
                    </div>
                  ))}
                  <p className="digimon-name">evoluciona de</p>
                  {this.state.priorEvolutions.map((preEvol, index) => (
                    <div key={index}>
                      <p>{preEvol.id}</p>
                      <img src={preEvol.image} style={{ width: "10px" }} />
                      <p>{preEvol.digimon}</p>
                    </div>
                  ))}
                  <p className="digimon-name">skills</p>
                  {this.state.skills.map((skill, index) => (
                    <div key={index}>
                      <p>{skill.skill}</p>
                      <p>{skill.description}</p>
                    </div>
                  ))}
                  <p className="digimon-name">types</p>
                  {this.state.types.map((type, index) => (
                    <div key={index}>
                      <p>{type.type}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="modal-footer">
            <div className="modal-footer-box"></div>
            <div className="modal-footer-source">
              <span>Internet</span>
            </div>
          </div>
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
