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
            { Object.keys(metaProps).length > 0 && <MetaComponent props={metaProps} /> }
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="#">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="#">Home <span className="sr-only">(current)</span></Link>
                                </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Test</Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={'login'}>Login</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default OrginTemplate