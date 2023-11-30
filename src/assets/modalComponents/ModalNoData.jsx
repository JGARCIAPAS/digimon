import { Component } from "react";

class ModalNoData extends Component {
  render() {
    return (
      <div className="modal-body">
        <div className="message-error">
          <p>Ups, parece que no hay datos con lo que has escrito</p>
          <p>¿Lo has escrito correctamente?</p>
          <img src="https://www.digi-api.com/images/digimon/w/Agumon_Hakase.png" />
        </div>
      </div>
    );
  }
}
export default ModalNoData;
