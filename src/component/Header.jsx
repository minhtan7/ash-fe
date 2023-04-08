import { useContext } from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { authContext } from '../context/authContext'

function Header() {
    const { user, logout } = useContext(authContext)

    const handleLogout = () => {
        logout();
    }

    return (
        <div className='container'>
            <div className='header'>
                <div className='logo'>
                    <Link to='/'>GamePage</Link>
                </div>
                {/* login */}
                <ul>
                    <li>
                        {user ?
                            <Link to='/' onClick={handleLogout}>
                                <FaSignOutAlt />Logout
                            </Link> :
                            <Link to='/login'>
                                <FaSignInAlt />Login
                            </Link>
                        }
                    </li>
                    <li>
                        {user ?
                            <Link to='/'>
                                <FaUser />hi,{user.name}
                            </Link> :
                            <Link to='/register'>
                                <FaUser />Register
                            </Link>
                        }
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header
