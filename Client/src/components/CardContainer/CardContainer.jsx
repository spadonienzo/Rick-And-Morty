import style from "./CardContainer.module.css";
import Card from "../Card/Card";

const CardContainer = (props) => {
  const { characters, onClose } = props;

  return (
    <div className={style.container}>
      {characters?.map((character) => (
        <Card
          key={character.id}
          id={character.id}
          name={character.name}
          species={character.species}
          gender={character.gender}
          image={character.image}
          onClose={() => onClose(character.id)}
        />
      ))}
    </div>
  );
};

export default CardContainer;
