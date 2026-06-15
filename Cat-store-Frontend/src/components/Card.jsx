import catimg from "../assets/image.png";
import PropTypes from "prop-types";
import "../css/Card.css";
function Card(props) {
  return (
    <div className="card">
      <img className="catImg" src={props.image} alt="Acatimg"></img>
      <div className="right">
        <p className="catName">{props.name}</p>
        <p className="breed">{props.breed}</p>
        <p className="age">{props.age} months</p>
        <p className="cost">${props.cost}</p>
        <p className="desc">{props.description}</p>
      </div>
    </div>
  );
}
Card.PropTypes = {
  name: PropTypes.string,
  breed: PropTypes.string,
  age: PropTypes.number,
  cost: PropTypes.number,
  description: PropTypes.string,
};

export default Card;
