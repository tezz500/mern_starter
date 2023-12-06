import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../../../helper/axios';
import MetaComponent from "../MetaComponent";
import { encryptData, checkAuth  } from "../../../helper/helper";
const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [metaProps, setMeta] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        if (checkAuth()) {
            navigate('/admin');
        }
        setMeta({
            title: "Login Page",
            description: "Login Page",
            og_title: "Login Page",
            og_description: "Login Page",
            og_image: "Login Page",
        });
    }, [navigate]);

    const login = async (e) => {
        setLoading(true);
        await axios.post('login', {
            email: email,
            password: password,
        }).then((response) => {
            setError('');
            const appInfo = {
                user:response.data.userInfo,
                token:response.data.token,
                permissions:response.data.permissions,
            }
            axios.defaults.headers = `Authorization: Bearer ${appInfo.token}`;
            const data = JSON.stringify(appInfo);
            const saveData = encryptData(data);
            localStorage.setItem('app_info', saveData);
            // navigate('/admin');
            window.location.href = '/admin';
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                setError(error.response.data.message);
            }
            console.log("This is error ", error);
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <div>
            {Object.keys(metaProps).length > 0 ? <MetaComponent props={metaProps} /> : ''}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-2">

                    </div>
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <h6>Login Page</h6>
                                {loading}
                            </div>
                            <div className="card-body">
                                <form action="#" method="post">
                                    <div className="row">
                                        <span className="text-danger">{error}</span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email: <span className="text-danger">*</span></label>
                                        <input type="email" name="email" className="form-control form-control-sm" onChange={(e) => setEmail(e.target.value)} onKeyUp={(e) => setEmail(e.target.value)} />
                                        <span className="text=danger"></span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Password: <span className="text-danger">*</span></label>
                                        <input type="password" name="password" autoComplete="true" className="form-control form-control-sm" onChange={(e) => setPassword(e.target.value)} onKeyUp={(e) => setPassword(e.target.value)} />
                                        <span className="text=danger"></span>
                                    </div>
                                    <div className="form-group">
                                        <button type="button" className="btn btn-danger float-end mt-2" onClick={login}>Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;