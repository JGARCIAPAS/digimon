import { Component } from "react";
import DigimonModal from "./DigimonModal";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      showModal: false,
      selectedDigimon: null,
    };
  }
  handleInputChange = (event) => {
    this.setState({
      inputValue: event.target.value,
      selectedDigimon: { name: event.target.value },
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("el valor del input es", this.state.inputValue);
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <>
        <div className="search">
          <form onSubmit={this.handleSubmit}>
            <input
              className="input"
              type="text"
              value={this.state.inputValue}
              onChange={this.handleInputChange}
              placeholder="digimon"
            />
            <button className="btn" type="submit">
              <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
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
export default Search;
