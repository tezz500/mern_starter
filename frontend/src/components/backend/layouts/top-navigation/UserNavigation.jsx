import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../../helper/helper";
import axios from "../../../../helper/axios";
const UserNavigation = () => {
    const navigate = useNavigate();
    const signOut = (e)=>{
        logout();
        navigate('/login');
    }
    return (
        <li className="nav-item dropdown">
            <Link className="nav-link" data-toggle="dropdown" to={'#'}>
                <i className="far fa-user"></i>
            </Link>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <Link to={'#'} className="dropdown-item">
                    <i className="fas fa-envelope mr-2"></i>
                    Profile
                </Link>
                <div className="dropdown-divider"></div>
                <Link to={'#'} className="dropdown-item">
                    <i className="fas fa-cog mr-2"></i>
                    Setting
                </Link>
                <div className="dropdown-divider"></div>
                <Link to={'#'} className="dropdown-item" onClick={()=>signOut()}>
                    <i className="fas fa-sign-out mr-2"></i>
                    Logout
                </Link>
            </div>
        </li>
    )
}

export default UserNavigation;