import { Outlet } from "react-router-dom"
import { useEffect } from "react";
import BackendNavigation from './BackendNavigation'
import BackendSidebar from './BackendSidebar';
import BackendFooter from './BackendFooter';
import BackendBreadcrumb  from "./BackendBreadcrumb";
import { checkAuth  } from "../../../helper/helper";
import { useNavigate } from 'react-router-dom';
const BackendTemplate = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        if (!checkAuth()) {
            navigate('/login');
        }
    }, [navigate]);
    return (
        <>
            <div className="hold-transition sidebar-mini">
                <div className="wrapper">
                    <BackendNavigation />
                    <BackendSidebar />
                    <div className="content-wrapper">
                        <BackendBreadcrumb />
                        <div className="content">
                            <div className="container-fluid">
                                <div className="row">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                    <BackendFooter />
                </div>
            </div>
        </>
    )
}

export default BackendTemplate