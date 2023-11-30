import { Component } from "react";
import PropTypes from "prop-types";

class EvolutionTable extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {this.props.evolutions.map((evol, index) => (
            <tr key={index}>
              <td>{evol.id}</td>
              <td>
                <img src={evol.image} alt={evol.digimon} title={evol.digimon} />
              </td>
              <td>{evol.digimon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
EvolutionTable.propTypes = {
  evolutions: PropTypes.array.isRequired,
};
export default EvolutionTable;
