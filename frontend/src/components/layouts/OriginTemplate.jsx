import { Link, Outlet } from 'react-router-dom'
import MetaComponent from "./MetaComponent";
import { useEffect, useState } from 'react';

const OrginTemplate = () =>{
    const [metaProps, setMeta] = useState({});
    
    useEffect(()=>{
        setMeta({
            title: "Home Page",
            description: "Home Page",
            og_title: "Home Page",
            og_description: "Home Page",
            og_image: "Home Page",
        });
    }, []);

    return (
        <>
            { Object.keys(metaProps).length > 0 ? <MetaComponent props={metaProps} /> : '' }
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {/* <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><hr className="dropdown-divider"></hr></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li> */}
                            </ul>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to={`login`} className="nav-link" tabIndex="-1" aria-disabled="true">Login</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="content-wraper" id="content-wrapper">
                    <Outlet  />
                </div>
            </div>
        </>
    );
}

export default OrginTemplate