import { Component } from "react";

class Digivice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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
        this.setState({ data: data });
      })
      .catch((error) => {
        console.error("fetch", error);
      });
  }
  render() {
    const allLevels = this.state.data.map((creature) => creature.level);
    const filterLevel = [...new Set(allLevels)];
    console.log(allLevels);
    console.log(filterLevel);
    /* ['Armor', 'Champion', 'Fresh', 'In Training', 'Mega', 'Rookie', 'Training', 'Ultimate'] */
    const levelValues = {
      fresh: 1,
      "in training": 2,
      training: 3,
      rookie: 4,
      champion: 5,
      ultimate: 6,
      mega: 7,
      armor: 8,
    };
    const creaturesOrderedByLevel = this.state.data.slice().sort((a, b) => {
      const levelA = levelValues[a.level.toLowerCase()];
      const levelB = levelValues[b.level.toLowerCase()];
      return levelA - levelB;
    });

    return (
      <>
        <h1>digivice</h1>
        {this.state.data && (
          <div>
            <ul>
              {creaturesOrderedByLevel
                .map((creature, index) => (
                  <li key={index}>
                    <p>{creature.name}</p>
                    <p>{creature.level}</p>
                    <img
                      src={creature.img}
                      style={{ /* width: "20px" */ mixBlendMode: "multiply" }}
                    />
                  </li>
                ))
                .sort((a, b) => {
                  if (a.level < b.level) {
                    return -1;
                  }
                  if (a.level > b.level) {
                    return 1;
                  }
                  return 0;
                })}
            </ul>
          </div>
        )}
      </>
    );
  }
}
export default Digivice;
