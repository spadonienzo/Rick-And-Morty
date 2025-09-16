import axios from "axios";
import {
  getLoggedInUser,
  handleUserLogin,
  handleUserLogout,
} from "../utils/UserUtils";

export const GET_CHARACTERS = "GET_CHARACTERS";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_BY_ID = "GET_BY_ID";
export const POST_CHARACTER = "POST_CHARACTER";
export const DELETE_CHARACTER = "DELETE_CHARACTER";
export const GET_FAVORITES = "GET_FAVORITES";
export const FAV_CHARACTER = "FAV_CHARACTER";
export const UNFAV_CHARACTER = "UNFAV_CHARACTER";
export const DELETE_FAVORITE = "DELETE_FAVORITE";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_USERS = "GET_USERS";
export const SET_LOGIN_STATUS = "SET_LOGIN_STATUS";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const FILTER_BY_STATUS = "FILTER_BY_STATUS";
export const FILTER_BY_GENDER = "FILTER_BY_GENDER";
export const CLEAR_FILTER = "CLEAR_FILTER";
export const FETCH_CHARACTERS = "FETCH_CHARACTERS";

export const getCharacter = () => {
  return async function (dispatch) {
    const response = await axios(`/characters/save`);
    return dispatch({
      type: "GET_CHARACTERS",
      payload: response.data,
    });
  };
};

export const getCharacterByName = (name) => {
  return async function (dispatch) {
    const response = await axios(`/characters/?name=${name}`);
    return dispatch({
      type: "GET_BY_NAME",
      payload: response.data,
    });
  };
};

export const getCharacterById = (id) => {
  return async function (dispatch) {
    const response = await axios(`/characters/${id}`);
    return dispatch({
      type: "GET_BY_ID",
      payload: response.data,
    });
  };
};

export const deleteCharacter = (id) => {
  return {
    type: "DELETE_CHARACTER",
    payload: id,
  };
};

export const deleteFavorite = (id) => {
  return {
    type: "DELETE_FAVORITE",
    payload: id,
  };
};

export const favCharacter = (userId, characterId) => {
  return async function (dispatch) {
    const response = await axios.post(`/characters/like`, {
      userId,
      characterId,
    });
    return dispatch({
      type: "FAV_CHARACTER",
      payload: response.data,
    });
  };
};

export const unfavCharacter = (userId, characterId) => {
  return async function (dispatch) {
    try {
      console.log(userId, characterId);
      await axios.delete(`/characters/dislike`, {
        data: {
          userId,
          characterId,
        },
      });
      dispatch({
        type: "UNFAV_CHARACTER",
        characterId,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postCharacter = (characterData) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/characters/`, characterData);
      console.log(response);
      return dispatch({
        type: "POST_CHARACTER",
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getFavorites = (id) => {
  return async function (dispatch) {
    const response = await axios(`/characters/favorites/${id}`);
    return dispatch({
      type: "GET_FAVORITES",
      payload: response.data,
    });
  };
};

export const getUsers = () => {
  return async function (dispatch) {
    const response = await axios(`/users/`);
    return dispatch({
      type: "GET_USERS",
      payload: response.data,
    });
  };
};

export const signup = ({ name, email, password }, handleSignupError) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/users/signup`, {
        name,
        email,
        password,
      });
      const token = response.data;
      handleUserLogin(token);
      dispatch({
        type: "SIGNUP",
        payload: getLoggedInUser(),
      });
    } catch (error) {
      handleSignupError(error);
    }
  };
};

export const login = ({ email, password }, handleLoginError) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/users/login`, {
        email,
        password,
      });
      const token = response.data;
      handleUserLogin(token);
      dispatch({
        type: "LOGIN",
        payload: getLoggedInUser(),
      });
    } catch (error) {
      handleLoginError(error);
    }
  };
};

export const logout = () => {
  handleUserLogout();
  return { type: "LOGOUT" };
};

export const orderByName = (value) => {
  return {
    type: ORDER_BY_NAME,
    payload: value,
  };
};

export const filterByOrigin = (origin) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  };
};

export const filterByStatus = (status) => {
  return {
    type: FILTER_BY_STATUS,
    payload: status,
  };
};

export const filterByGender = (gender) => {
  return {
    type: FILTER_BY_GENDER,
    payload: gender,
  };
};

export const clearFilter = (value) => {
  return {
    type: CLEAR_FILTER,
    payload: value,
  };
};

export const fetchCharacters = (gender, status, origin, orderBy) => {
  return async function (dispatch) {
    try {
      const response = await axios.get("/users/filter", {
        params: {
          gender,
          status,
          origin,
          orderBy,
        },
      });

      dispatch({
        type: FETCH_CHARACTERS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };
};
