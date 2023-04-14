import { ADD_FAV,REMOVE_FAV,FILTER,ORDER } from "./types";

const initialState = {
    myFavorites:[],
    allCharacters:[]
    }

const reducer = (state = initialState,action) => {
    switch(action.type){
        case ADD_FAV:
            return{
                ...state,
                myFavorites:[...state.allCharacters,action.payload],
                allCharacters:[...state.allCharacters,action.payload]
            }
        case REMOVE_FAV:
            return{
                ...state,
                myFavorites: state.myFavorites.filter(fav => fav.id !== action.payload)
            }
            case FILTER:
                const characfilter = state.allCharacters.filter(charac => charac.gender === action.payload )
                return{
                    ...state,
                    myFavorites:characfilter
            }

            case ORDER:
                const characfavcopy = [...state.allCharacters]
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