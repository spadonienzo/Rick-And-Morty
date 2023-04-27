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

const URL = 'http://localhost:3001/rickandmorty/login';

function App() {
   
   const location = useLocation()
   const navigate = useNavigate()
   const [characters, setCharacters] = useState([])
   const [access, setAccess] = useState(false)
   
   const login = async (userData) => {
      try {
         const { email, password } = userData;
         const {data} = await axios(URL + `?email=${email}&password=${password}`)
         const { access } = data;
         setAccess(access);
         access && navigate('/home');

      } catch (error) {
         console.log(error.message);
      }
   }
   
   useEffect(() => {
      !access && navigate('/');
   }, [access, navigate]);

   const onSearch= async (id) => {
      try {
         const {data} = await axios(`http://localhost:3001/rickandmorty/character/${id}`)
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         }
      } catch (error) {
         alert('No hay personajes con este ID!')
      }
   }

   const onClose = (id) => {
      const charactersfiltered = characters.filter(character => character.id !== id)
      setCharacters(charactersfiltered)

   }

   const logout = () => {
      setAccess(false)
   }

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