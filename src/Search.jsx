import { Component } from "react";

class Search extends Component {
  render() {
    return (
      <div className="search">
        <form>
          <input className="input" type="text" placeholder="Buscar digimon" />
          <div className="btn">
            <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
          </div>
        </form>
      </div>
    );
  }
}
export default Search;
