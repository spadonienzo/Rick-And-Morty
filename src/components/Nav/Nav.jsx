import Searchbar from '../Searchbar/SearchBar'
import { Link } from 'react-router-dom'

const Nav = ({onSearch, logout}) => {
    return (
        <div>
            <nav>

                <button>
                    <Link to='/home'>Home</Link>
                </button>
                <button>
                    <Link to='/about'>About</Link>
                </button>
                <button>
                    <Link to='/favorites'>Favorites</Link>
                </button>
                <button onClick={logout}>
                    <Link to='/'>Logout</Link>
                </button>

                <Searchbar onSearch={onSearch}/>
            </nav>    
        </div>
    )
}

export default Nav