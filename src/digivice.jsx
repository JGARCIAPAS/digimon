import { Component } from "react";

class Digivice extends Component {
  componentDidMount() {
    /* todos los digimon 
    https://www.digi-api.com/api/v1/digimon?pageSize=1422 */
    fetch("https://www.digi-api.com/api/v1/digimon?pageSize=1422");
  }
  render() {
    return (
      <>
        <h1>Digivice</h1>
      </>
    );
  }
}
export default Digivice;
