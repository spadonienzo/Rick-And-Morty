import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from "./Detail.module.css";
import { getCharacterById } from "../../redux/actions";

const Detail = () => {
  const { id } = useParams();
  const detail = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCharacterById(id));
  }, [dispatch, id]);

  console.log(detail);

  if (detail.length) {
    return (
      <div>
        <a href="/home" className={style.backlink}>
          <div className={style.backarrow}>←</div>
        </a>
        {detail.map((character) => (
          <div key={character.id} className={style.container}>
            <div>
              <span className={style.name}>{character.name.toUpperCase()}</span>
            </div>
            <div className={style.container_data}>
              <img
                src={character.image}
                alt={character.name}
                className={style.img}
              />
              <div className={style.extbox}>
                <p>Origin: {character.origin}</p>
                <p>Species: {character.species}</p>
                <p>Gender: {character.gender}</p>
                <p>Status: {character.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};
export default Detail;
