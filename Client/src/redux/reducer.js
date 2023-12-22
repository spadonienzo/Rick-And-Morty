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
  DELETE_FAVORITE,
  DELETE_CHARACTER,
  GET_USERS,
  LOGOUT,
  SET_LOGIN_STATUS,
  ORDER_BY_NAME,
  FILTER_BY_GENDER,
  FILTER_BY_ORIGIN,
  FILTER_BY_STATUS,
  CLEAR_FILTER,
  FETCH_CHARACTERS,
} from "./actions";

const initialState = {
  allCharacters: [],
  characters: [],
  users: [],
  user: null,
  detail: [],
  favorites: [],
  login: false,
  gender: null,
  status: null,
  origin: null,
  orderBy: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHARACTERS:
      return {
        ...state,
        allCharacters: action.payload,
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
    case DELETE_FAVORITE:
      let filteredFavs = state.favorites.filter(
        (fav) => fav.id !== action.payload
      );
      return {
        ...state,
        favorites: filteredFavs,
      };
    case SIGNUP:
      return {
        ...state,
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
    case ORDER_BY_NAME:
      return {
        ...state,
        orderBy: action.payload,
      };

    case FILTER_BY_ORIGIN:
      return {
        ...state,
        origin: action.payload,
      };

    case FILTER_BY_GENDER:
      return {
        ...state,
        gender: action.payload,
      };

    case FILTER_BY_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    case CLEAR_FILTER:
      return {
        ...state,
        characters: state.allCharacters,
      };
    case FETCH_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
