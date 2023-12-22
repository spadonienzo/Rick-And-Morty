import style from "./Favorites.module.css";
import CardContainer from "../CardContainer/CardContainer";
import Paginate from "../Paginate/Paginate";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteFavorite, getFavorites } from "../../redux/actions";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const currentCharacters = favorites.slice(startIndex, endIndex);
  const [isMounted, setisMounted] = useState(false);
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user) {
      const id = user.id;
      if (!isMounted && !favorites.length) {
        dispatch(getFavorites(id));
        setisMounted(true);
      }
    }
  }, [dispatch, favorites, isMounted]);

  const onClose = (id) => {
    dispatch(deleteFavorite(id));
  };

  if (!favorites.length) {
    return (
      <h2 className={style.loading}>
        {!isMounted
          ? "LOADING ..."
          : "YOU DON'T HAVE FAVORITES, PLEASE ADD THEM ON THE HOME PAGE."}
      </h2>
    );
  } else if (favorites.length) {
    return (
      <div className={style.home}>
        <CardContainer onClose={onClose} characters={currentCharacters} />
        <Paginate
          totalItems={favorites.length}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    );
  }
};
export default Favorites;
