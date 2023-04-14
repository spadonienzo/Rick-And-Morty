import './App.css';
import axios from 'axios'
import Cards from './components/Cards/Cards.jsx';
import Nav from './components/Nav/Nav.jsx';
import About from './components/About';
import Detail from './components/Detail';
import Form from './components/Form/Form';
import Favorites from './components/Favorites';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'

const URL_BASE = 'https://be-a-rym.up.railway.app/api/character'
const API_KEY = '7fda3e30ef76.22da1d6a2be37c11a0da'

function App() {

   const location = useLocation()
   const navigate = useNavigate()

   const [characters, setCharacters] = useState([])
   const onSearch= (id) => {
      axios(`${URL_BASE}/${id}?key=${API_KEY}`).then(({ data }) => {
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            window.alert('¡No hay personajes con este ID!');
         }
      });
   }

   const onClose = (id) => {
      const charactersfiltered = characters.filter(character => character.id !== id)
      setCharacters(charactersfiltered)

   }



   const [access, setAccess] = useState(false)

   const EMAIL = 'enzo@gmail.com'
   const PASSWORD = 'hola123'

   const login = (userData) => {
      if(userData.email === EMAIL && userData.password === PASSWORD){
         setAccess(true)
         navigate('/home')
      }
   }

   const logout = () => {
      setAccess(false)
   }

   useEffect(() => {
      !access && navigate('/');
   }, [access]);

   return (
      <div className='App'>
            {
               location.pathname !==  '/' && <Nav onSearch={onSearch} logout={logout}/>
            }
         <Routes>
            <Route path='/' element= {<Form login={login}/>}/>
            <Route path='/home' element = {<Cards characters={characters} onClose={onClose}/>}/>
            <Route path='/about' element = {<About/>}/>
            <Route path='/detail/:id' element = {<Detail/>}/>
            <Route path='/favorites' element= {<Favorites/>}/>
         </Routes>
      </div>
   );
}

export default App;
