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
    fetch("https://digimon-api.vercel.app/api/digimon")
      .then((response) => {
        if (!response.ok) {
          console.log("response error");
        }
        return response.json();
      })
      .then((data) => {
        const allLevels = data.map((creature) => creature.level);
        const filteredLevels = [...new Set(allLevels)];
        console.log(filteredLevels);
        this.setState({ data: data.levels });
      })
      .catch((error) => {
        console.error("fetch error", error);
      });
  }
  render() {
    return (
      <>
        <div>
          <h1>Digidex</h1>
          <DigimonGroup level="Fresh" />
        </div>
      </>
    );
  }
}
export default Digidex;
