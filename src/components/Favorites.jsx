import Card from "./Card/Card"
import { connect } from "react-redux"
import { filterCards,orderCards } from "../redux/actions"
import { useDispatch } from "react-redux"
import { useState } from "react"

const Favorites = ({myFavorites}) => {
    const dispatch = useDispatch()

    const [aux,setAux] = useState(false)

    const handleOrder = (event) => {
        dispatch(orderCards(event.target.value))
        setAux(!aux)
    }

    const handleFilter = (event) => {
        dispatch(filterCards(event.target.value))
    }



    return (
        <div>
            <select onChange={handleOrder}>
                <option value="A">A</option>
                <option value="B">B</option>
            </select>
            <select onChange={handleFilter}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">unknown</option>
            </select>
            {
                myFavorites?.map(fav => {
                    return (
                        <Card
                            key={fav.id}
                            id={fav.id}
                            name={fav.name}
                            species={fav.species}
                            gender={fav.gender}
                            image={fav.image}
                            onClose={fav.onClose}
                        />
                    )
                })
            }
        </div>
    )

}
const mapStateToProps = (state) => {
    return{
        myFavorites : state.myFavorites
    }
}

export default connect(
    mapStateToProps,
    null
)(Favorites);


