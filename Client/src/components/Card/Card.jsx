import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { favCharacter, unfavCharacter } from "../../redux/actions";

const Card = ({ name, species, gender, image, onClose, id }) => {
  const [isFav, setIsFav] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const user = JSON.parse(window.localStorage.getItem("user"));
  const userId = user ? user.id : null;

  const onFav = () => {
    if (isFav) {
      setIsFav(false);
      dispatch(unfavCharacter(userId, id));
    } else {
      setIsFav(true);
      dispatch(favCharacter(userId, id));
    }
  };

  useEffect(() => {
    favorites.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [favorites]);

  return (
    <div className={style.divCard}>
      <div className={style.btnCards}>
        <div>
          {isFav ? (
            <button onClick={onFav} className={style.btnFav}>
              ❤️
            </button>
          ) : (
            <button onClick={onFav} className={style.btnFav}>
              🤍
            </button>
          )}
        </div>

        <div>
          <button onClick={onClose} className={style.btn}>
            X
          </button>
        </div>
      </div>
      <div className={style.divInfo}>
        <img src={image} alt={name} className={style.image} />
        <Link to={`/detail/${id}`} className={style.link}>
          <h2 className={style.name}>{name}</h2>
        </Link>

        <div className={style.divSpeciesGender}>
          <h2 className={style.species}>{species}</h2>
          <h2 className={style.gender}>{gender}</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
