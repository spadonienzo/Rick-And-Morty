import axios from "axios";

export const GET_CHARACTERS = "GET_CHARACTERS";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_BY_ID = "GET_BY_ID";
export const POST_CHARACTER = "POST_CHARACTER";
export const DELETE_CHARACTER = "DELETE_CHARACTER";
export const GET_FAVORITES = "GET_FAVORITES";
export const FAV_CHARACTER = "FAV_CHARACTER";
export const UNFAV_CHARACTER = "UNFAV_CHARACTER";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_USERS = "GET_USERS";
export const SET_LOGIN_STATUS = "SET_LOGIN_STATUS";

export const getCharacter = () => {
  return async function (dispatch) {
    const response = await axios(`http://localhost:3001/characters/`);
    return dispatch({
      type: "GET_CHARACTERS",
      payload: response.data,
    });
  };
};

export const getCharacterByName = (name) => {
  return async function (dispatch) {
    const response = await axios(
      `http://localhost:3001/characters/?name=${name}`
    );
    return dispatch({
      type: "GET_BY_NAME",
      payload: response.data,
    });
  };
};

export const getCharacterById = (id) => {
  return async function (dispatch) {
    const response = await axios(`http://localhost:3001/characters/${id}`);
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

export const favCharacter = (userId, characterId) => {
  return async function (dispatch) {
    const response = await axios.post(`http://localhost:3001/characters/like`, {
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
      await axios.delete(`http://localhost:3001/characters/dislike`, {
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

export const postCharacter = (name, status, species, gender, origin, image) => {
  return async function (dispatch) {
    const response = await axios.post(`http://localhost:3001/characters/`, {
      name,
      status,
      species,
      gender,
      origin,
      image,
    });
    console.log(response);
    alert("Character has been created succesfully");
    return dispatch({
      type: "POST_CHARACTER",
    });
  };
};

export const getFavorites = (id) => {
  return async function (dispatch) {
    const response = await axios(
      `http://localhost:3001/characters/favorites/${id}`
    );
    return dispatch({
      type: "GET_FAVORITES",
      payload: response.data,
    });
  };
};

export const getUsers = () => {
  return async function (dispatch) {
    const response = await axios(`http://localhost:3001/users/`);
    return dispatch({
      type: "GET_USERS",
      payload: response.data,
    });
  };
};

export const signup = ({ name, email, password }) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`http://localhost:3001/users/signup`, {
        name,
        email,
        password,
      });
      const user = response.data;

      dispatch({
        type: "SIGNUP",
        payload: user,
      });

      window.localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      alert(error.message);
    }
  };
};

export const login = ({ email, password }) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`http://localhost:3001/users/login`, {
        email,
        password,
      });

      const user = response.data;

      dispatch({
        type: "LOGIN",
        payload: user,
      });

      window.localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      alert(error.message);
    }
  };
};

export const logout = () => {
  return async function (dispatch) {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
  };
};
