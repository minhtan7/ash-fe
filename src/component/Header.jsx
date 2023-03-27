import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'

import {Link} from 'react-router-dom'

function Header() {
  return (
    <div className='header'>
        <div className='logo'>
            <Link to='/' >GamePage</Link>
        </div>
        {/* login  */}
        <ul>
            <li>
                <Link to='/login'>
                    <FaSignInAlt />Login
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    <FaUser />Register
                </Link>
        </li>
        </ul>
        {/* register */}
        
    </div>
  )
}

export default Header