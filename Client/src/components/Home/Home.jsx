import style from "./Home.module.css";
import CardContainer from "../CardContainer/CardContainer";
import Paginate from "../Paginate/Paginate";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getCharacter,
  deleteCharacter,
  getFavorites,
} from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const currentCharacters = characters.slice(startIndex, endIndex);

  useEffect(() => {
    if (characters.length < 1) dispatch(getCharacter());
  }, [dispatch, characters]);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));

    if (user) {
      const id = user.id;
      dispatch(getFavorites(id));
    }
  }, [dispatch]);

  const onClose = (id) => {
    dispatch(deleteCharacter(id));
  };

  if (characters.length) {
    // Render your component content that relies on user data
    return (
      <div className={style.home}>
        <CardContainer onClose={onClose} characters={currentCharacters} />
        <Paginate
          totalItems={characters.length}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    );
  } else {
    return <h2 className={style.loading}>LOADING ...</h2>;
  }
};

export default Home;
