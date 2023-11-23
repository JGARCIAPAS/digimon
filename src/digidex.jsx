import { Component } from "react";
import DigimonGroup from "./DigimonGroup";

class Digidex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levels: [],
    };
  }
  componentDidMount() {
    Promise.all([
      fetch("https://www.digi-api.com/api/v1/level?page=0"),
      fetch("https://www.digi-api.com/api/v1/level?page=1"),
    ])
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((data) => {
        const mergeLevels = data[0].content.fields.concat(
          data[1].content.fields
        );
        const order = {
          Digitama: 1,
          "Baby I": 2,
          "Baby II": 3,
          Child: 4,
          Adult: 5,
          Perfect: 6,
          Ultimate: 7,
          Hybrid: 8,
          Armor: 9,
          Unknown: 10,
        };
        const orderedLevels = mergeLevels
          .sort((a, b) => order[a.name] - order[b.name])
          .slice(1);
        this.setState({ levels: orderedLevels });
        console.log("start niveles");
        console.log(this.state.levels);
        console.log("end niveles");
      })
      .catch((error) => {
        console.error("fetch error", error);
      });
    /*  fetch("https://digimon-api.vercel.app/api/digimon")
      .then((response) => {
        if (!response.ok) {
          console.log("response error");
        }
        return response.json();
      })
      .then((data) => {
        const allLevels = data.map((creature) => creature.level);
        const filteredLevels = [...new Set(allLevels)];
        const order = {
          Fresh: 1,
          "In Training": 2,
          Training: 3,
          Rookie: 4,
          Champion: 5,
          Ultimate: 6,
          Mega: 7,
          Armor: 8,
        };
        const orderedLevels = filteredLevels.sort(
          (a, b) => order[a] - order[b]
        );
        console.log(orderedLevels);
        this.setState({ levels: orderedLevels });
      })
      .catch((error) => {
        console.error("fetch error", error);
      }); */
  }
  render() {
    return (
      <>
        <div>
          <h1>Digidex</h1>
          <ul>
            {this.state.levels.map((level, index) => (
              <DigimonGroup key={index} level={level.name} />
            ))}
          </ul>
        </div>
      </>
    );
  }
}
export default Digidex;
