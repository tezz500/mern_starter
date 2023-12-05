import { Link } from "react-router-dom"
import UserManagementSidebar from "./sidebar-management/UserManagementSidebar";
import UserInfoSidebar from "./sidebar-management/UserInfoSidebar";
const BackendSidebar = ()=>{
    return (
            <div>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <Link to={'dashboard'} className="brand-link">
                        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3"/>
                            <span className="brand-text font-weight-light">App Name</span>
                    </Link>
                    <div className="sidebar">
                        <UserInfoSidebar />
                        <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                    <div className="input-group-append">
                                        <button className="btn btn-sidebar">
                                            <i className="fas fa-search fa-fw"></i>
                                        </button>
                                    </div>
                            </div>
                        </div>

                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                               <UserManagementSidebar />
                                <li className="nav-item">
                                    <Link to={'#'}  
                                        className={"nav-link"}>
                                        <i className="nav-icon fas fa-th"></i>
                                        <p>
                                            Message
                                            <span className="right badge badge-danger">New</span>
                                        </p>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
            </div>
    )
}


export default BackendSidebar;