import { ADD_FAV,REMOVE_FAV,FILTER,ORDER } from "./types";

const initialState = {
    myFavorites:[],
    allCharactersFav:[]
    }

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_FAV:
            return{
                ...state,
                myFavorites:action.payload,
                allCharactersFav:action.payload
            }
        case REMOVE_FAV:
            return{
                ...state,
                myFavorites: action.payload,
                allCharactersFav: action.payload
            }
        case FILTER:
            const allCharactersFiltered = state.allCharactersFav.filter(character => character.gender === action.payload)
            return {
                ...state,
                myFavorites: 
                    action.payload === 'allCharacters'
                    ? [...state.allCharactersFav]
                    : allCharactersFiltered
            }

        case ORDER:
            const characfavcopy = [...state.allCharactersFav]
            return{
                ...state,
                myFavorites:
                    action.payload === 'A'
                    ? characfavcopy.sort((a,b) => a.id - b.id)
                    : characfavcopy.sort((a,b) => b.id - a.id)                    
            }
        default:
            return{...state}
    }   
}

export default reducer