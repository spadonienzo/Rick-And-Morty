import React, { useState } from "react";
import style from "./Filters.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  orderByName,
  filterByOrigin,
  filterByGender,
  filterByStatus,
  clearFilter,
  getCharacter,
} from "../../redux/actions";

const Filters = () => {
  const dispatch = useDispatch();
  const gender = useSelector((state) => state.gender);
  const status = useSelector((state) => state.status);
  const origin = useSelector((state) => state.origin);
  const orderBy = useSelector((state) => state.orderBy);

  const [originFilter, setOriginFilter] = useState("ALL");
  const [genderFilter, setGenderFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [nameOrder, setNameOrder] = useState("DEFAULT");

  const handleOrderName = (event) => {
    event.preventDefault();
    setNameOrder(event.target.value);
    dispatch(orderByName(event.target.value));
  };

  const handleFilterByOrigin = (event) => {
    event.preventDefault();
    setOriginFilter(event.target.value);
    const selectedOrigin =
      event.target.value === "" ? null : event.target.value;
    dispatch(filterByOrigin(selectedOrigin));
  };

  const handleFilterByGender = (event) => {
    event.preventDefault();
    setGenderFilter(event.target.value);
    dispatch(filterByGender(event.target.value));
  };

  const handleFilterByStatus = (event) => {
    event.preventDefault();
    setStatusFilter(event.target.value);
    dispatch(filterByStatus(event.target.value));
  };

  const handleClearFilter = (event) => {
    event.preventDefault();

    // Reset state and dispatch actions with default values
    setOriginFilter("ALL");
    setGenderFilter("ALL");
    setStatusFilter("ALL");
    setNameOrder("DEFAULT");

    dispatch(getCharacter());
    dispatch(clearFilter());
  };

  return (
    <div className={style.container}>
      <button className={style.buttonclear} onClick={handleClearFilter}>
        Clear
      </button>
      <div className={style.filtertitles}>FILTER BY : </div>
      <div>
        <select
          value={origin}
          className={style.selection}
          onChange={handleFilterByOrigin}
        >
          <option value="">ALL</option>
          <option value={false}>API</option>
          <option value={true}>CREATED</option>
        </select>
        <select
          value={gender}
          className={style.selection}
          onChange={handleFilterByGender}
        >
          <option value="">ALL</option>
          <option value="Female">FEMALE</option>
          <option value="Male">MALE</option>
          <option value="unknown">UNKNOWN</option>
        </select>
        <select
          value={status}
          className={style.selection}
          onChange={handleFilterByStatus}
        >
          <option value="">ALL</option>
          <option value="Alive">ALIVE</option>
          <option value="Dead">DEAD</option>
          <option value="unknown">UNKNOWN</option>
        </select>
      </div>
      <div className={style.filtertitles}>SORT BY : </div>
      <div>
        <select
          value={orderBy}
          className={style.selection}
          onChange={handleOrderName}
        >
          <option value="">DEFAULT</option>
          <option value="name-asc">A-Z</option>
          <option value="name-desc">Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
