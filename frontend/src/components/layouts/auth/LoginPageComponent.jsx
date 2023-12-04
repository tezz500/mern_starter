import { useEffect, useState } from "react";
import axios from '../../../helper/helper';
import MetaComponent from "../MetaComponent";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [metaProps, setMeta] = useState({});
    const [error, setError] = useState();
    const [errors, setErrors] =  useState();

    useEffect(()=>{
        setMeta({
            title: "Login Page",
            description: "Login Page",
            og_title: "Login Page",
            og_description: "Login Page",
            og_image: "Login Page",
        });
    }, []);

    const login = async (e) => {
        setLoading(true);
        await axios.post('login', {
            email: email,
            password: password,
        }).then((response) => {
            setError('');
            console.log("this is response ", response);
        }).catch((error) => {
            if(error.response.status == 401 ){
                setError(error.response.data.message);
            }
            console.log("This is error ", error);
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <div>
            { Object.keys(metaProps).length > 0 ? <MetaComponent props={metaProps} /> : '' }
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-2">

                    </div>
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <h6>Login Page</h6>
                            </div>
                            <div className="card-body">
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
                                    <input type="password" name="password" className="form-control form-control-sm" onChange={(e) => setPassword(e.target.value)} onKeyUp={(e) => setPassword(e.target.value)} />
                                    <span className="text=danger"></span>
                                </div>
                                <div className="form-group">
                                    <button type="button" className="btn btn-danger float-end mt-2" onClick={login}>Login</button>
                                </div>
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