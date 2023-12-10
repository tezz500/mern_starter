import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { encryptData, checkAuth, logout } from "../../../helper/helper";
import axios from "../../../helper/axios";
import Swal from 'sweetalert2';
import { param } from "jquery";
const UserFormComponent = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [isEdit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState({
        name:'',
        email:'',
        password:'',
        confirm_password:'',
        role:'',
    });
    const [errors, setErrors] = useState({});
    const fecthRoles = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('roles');
            setRoles(response.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [setRoles])
    const getErrors = (key) => {
        if (errors.hasOwnProperty(key) && errors[key].length > 0) {
            return errors[key][0].msg;
        }
        return '';
    }
    const saveUer = useCallback(async () => {
        setFormLoading(true);
        try {
            if(isEdit){
                const response = await axios.patch(`users/${user._id}`, user);
            }else{
                const response = await axios.post('users', user);
            }
            Swal.fire("Successfully Saved", 'success');
            navigate('/admin/user'); 
        } catch (error) {
            if(error.response.status === 422){
                setErrors(error.response.data.data);
            }else{
                Swal.fire("Sorry Internal Server Error", 'error');
            }
            console.log(error);
        } finally {
            setFormLoading(false);
        }
    }, [setErrors, user, navigate]);

    useEffect(() => {
        if(!checkAuth()){
            logout();
            navigate('login');
        }
        if(params.hasOwnProperty('id')){
            if(params.id){
                setEdit(true);
                fetchUser(params.id);
            }
        }
        fecthRoles();
    }, [fecthRoles, setUser, setEdit, params]);

    const fetchUser = useCallback(async(user_id)=>{
        try {
            const response = await axios.get(`users/${user_id}`);
            const user = response.data.data;
            setUser({
                _id:user._id,
                name:user.name,
                email:user.email,
                password:'',
                confirm_password:'',
                role:user.role,
            })
        } catch (error) {
            console.log(error);
        }finally{

        }
    }, [setUser]);


    return (
        <div className="col-md-12">
            <form action="#" methos="post">
                <div className="card">
                    <div className="card-header">
                        User Form
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">Name: <span className="text-danger">*</span></label>
                                    <input type="text" name="name" value={user.name} className="form-control form-control-sm" placeholder="Please Enter Full Name" required onChange={(e) => setUser({ ...user, name: e.target.value })} onKeyUp={(e) => setUser({ ...user, name: e.target.value })} />
                                </div>
                                <span className="text-danger">{ getErrors('name') }</span>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">Email: <span className="text-danger">*</span></label>
                                    <input type="email" name="email" value={user.email} className="form-control form-control-sm" placeholder="Please Enter Email" required onChange={(e) => setUser({ ...user, email: e.target.value })} onKeyUp={(e) => setUser({ ...user, email: e.target.value })} />
                                </div>
                                <span className="text-danger">{ getErrors('email') }</span>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">Password: <span className="text-danger">*</span></label>
                                    <input type="password" name="password" value={user.password} className="form-control form-control-sm" placeholder="Please Enter Password" autoComplete="false" required onChange={(e) => setUser({ ...user, password: e.target.value })} onKeyUp={(e) => setUser({ ...user, password: e.target.value })} />
                                </div>
                                <span className="text-danger">{ getErrors('password') }</span>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">Confirm Password: <span className="text-danger">*</span></label>
                                    <input type="password" name="confirm_password" value={user.confirm_password} className="form-control form-control-sm" placeholder="Please Enter Password" autoComplete="false" required onChange={(e) => setUser({ ...user, confirm_password: e.target.value })} onKeyUp={(e) => setUser({ ...user, confirm_password: e.target.value })}/>
                                </div>
                                <span className="text-danger">{ getErrors('confirm_password') }</span>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">Role: <span className="text-danger">*</span></label>
                                    <select
                                        name="role"
                                        id="role"
                                        className="form-control form-control-sm"
                                        onChange={(e) => {
                                            setUser({ ...user, role: e.target.value })
                                        }}
                                    >
                                        <option value="">Select a Role</option>
                                        {roles.length > 0 &&
                                            roles.map((item, index) => (
                                                <option
                                                    selected={parseInt(user.role) === item.role.value}
                                                    value={item.role.value}
                                                    key={index + encryptData(item.role.name)}
                                                >
                                                    {item.role.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <span className="text-danger">{ getErrors('role') }</span>
                            </div>

                            <div className="col-md-12">
                                
                                <button type="button" className="btn btn-sm btn-primary" onClick={() => saveUer()} disabled={formLoading}>
                                    {!formLoading ? 'Submit' : 'Submitting'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">

                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserFormComponent;