import {
  GET_CHARACTERS,
  GET_BY_NAME,
  GET_BY_ID,
  SIGNUP,
  LOGIN,
  GET_FAVORITES,
  POST_CHARACTER,
  FAV_CHARACTER,
  UNFAV_CHARACTER,
  DELETE_CHARACTER,
  GET_USERS,
  LOGOUT,
  SET_LOGIN_STATUS,
} from "./actions";

const initialState = {
  characters: [],
  users: [],
  user: null,
  detail: [],
  favorites: [],
  login: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
      };
    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        characters: action.payload,
      };
    case GET_BY_ID:
      return {
        ...state,
        detail: action.payload,
      };
    case POST_CHARACTER:
      return {
        ...state,
      };
    case DELETE_CHARACTER:
      let filteredCharacters = state.characters.filter(
        (charac) => charac.id !== action.payload
      );
      return {
        ...state,
        characters: filteredCharacters,
      };
    case FAV_CHARACTER:
      return {
        ...state,
      };
    case UNFAV_CHARACTER:
      return {
        ...state,
      };
    case SIGNUP:
      return {
        ...state,
        users: action.payload,
        user: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    case SET_LOGIN_STATUS:
      return {
        ...state,
        login: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return { ...state };
  }
};

export default reducer;
