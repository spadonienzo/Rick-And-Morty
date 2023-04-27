import { useState } from "react"

export default function SearchBar({onSearch}) {
   
   const [id, setId] = useState('')
   
   const handleChange = (event) => { // el event es todo, desp esta target q es el input en si y event.target.value es el input.value
      setId(event.target.value)
   }
   
   return (
      <div>
         <input type='search' onChange={handleChange} value={id}/>
         <button onClick={() => (onSearch(id),setId(''))}>Agregar</button>
      </div>
   )
}
