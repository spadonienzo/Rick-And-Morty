import { useState } from "react";
import validation from "../validations";
import './Form.css'

const Form = ({login}) => {

    const [errors, setErrors] = useState({})
    const [userData, setData] = useState({
        email:'',
        password:''
    })

    const handleChange = (event) => {
        setData({
            ...userData, 
            [event.target.name] : event.target.value
        })

        setErrors(validation({
            ...userData, 
            [event.target.name] : event.target.value
        }))
    }

    const handleSubmit = (event) => {
            event.preventDefault()
            login(userData)
    }

    return (
        <div className="loginform">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input name="email" type="text" placeholder="Ingrese su mail" value={userData.email} onChange={handleChange}></input>
                {errors.email && <p>{errors.email}</p>}
                <label htmlFor="password">Password:</label>
                <input name="password" type="password" placeholder="Ingrese una password" value={userData.password} onChange={handleChange}></input>
                {errors.password && <p>{errors.password}</p>}
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Form