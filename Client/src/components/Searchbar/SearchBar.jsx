import React, { useState } from "react";
import style from "./SearchBar.module.css";
import { getCharacterByName } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [searchCharacter, setSearchCharacter] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setSearchCharacter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getCharacterByName(searchCharacter));
    setSearchCharacter("");
  };

  return (
    <div className={style.bar}>
      <form onChange={(event) => handleChange(event)}>
        <input type="search" className={style.input} value={searchCharacter} />
        <button
          className={style.buttonsubmit}
          type="submit"
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>
    </div>
  );
}
