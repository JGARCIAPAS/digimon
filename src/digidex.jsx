import { Component } from "react";
import DigimonGroup from "./DigimonGroup";
import Search from "./Search";
import Footer from "./Footer";

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
      })
      .catch((error) => {
        console.error("fetch error", error);
      });

    var canvas = document.querySelector("canvas"),
      ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var letters = "01";
    letters = letters.split("");
    var fontSize = 10,
      columns = canvas.width / fontSize;
    var drops = [];
    for (var i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    // Setting up the draw function
    function draw() {
      ctx.fillStyle = "rgba(32, 32, 32, .1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < drops.length; i++) {
        var text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = "#0f0";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
    }
    // Loop animation
    setInterval(draw, 33);
  }
  render() {
    return (
      <div className="digidex">
        <div className="digidex-container">
          <div className="header">
            <picture className="logo">
              <source srcSet="img/digidex_logo.png"></source>
              <img className="logo" src="img/digidex_logo.png" />
            </picture>
          </div>
          <Search />
          <ul className="row-level">
            {this.state.levels.map((level, index) => (
              <DigimonGroup key={index} level={level.name} />
            ))}
          </ul>
        </div>
        <Footer />
        <canvas></canvas>
      </div>
    );
  }
}
export default Digidex;
