import { useState, useEffect, useCallback } from "react";
import { encryptData } from "../../../helper/helper";
import axios  from "../../../helper/axios";
const UserFormComponent = ()=>{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState({});
    const fecthRoles = useCallback(async ()=>{
        setLoading(true);
        try {
            const response =await axios.get('roles');
            setRoles(response.data.data);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }, [setRoles])

    const saveUer = useCallback(async ()=>{
        try {
            const response = await axios.post('users', user);
            console.log(response);
        } catch (error) {
            console.log(error);
        }finally{

        }
    });
    useEffect(()=>{
        fecthRoles();
    }, [fecthRoles, user]);
    return(
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
                                <input type="text" name="name" className="form-control form-control-sm" placeholder="Please Enter Full Name" required onChange={(e)=>setUser({...user, name:e.target.value})}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="name">Email: <span className="text-danger">*</span></label>
                                <input type="email" name="email" className="form-control form-control-sm" placeholder="Please Enter Email" required onChange={(e)=>setUser({...user, email:e.target.value})}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="name">Password: <span className="text-danger">*</span></label>
                                <input type="password" name="password" className="form-control form-control-sm" placeholder="Please Enter Password" autoComplete="false" required onChange={(e)=>setUser({...user, password:e.target.value})}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="name">Confirm Password: <span className="text-danger">*</span></label>
                                <input type="password" name="confirm_password" className="form-control form-control-sm" placeholder="Please Enter Password" autoComplete="false" required onChange={(e)=>setUser({...user, confirm_password:e.target.value})}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="name">Role: <span className="text-danger">*</span></label>
                                <select name="role" id="role" className="form-control form-control-sm">
                                    <option value="">Plesae Select</option>
                                    {
                                        roles.length > 0 &&
                                        roles.map((item, index)=>{
                                            return (
                                                <option value={item.role.value} key={index+encryptData(item.role.name)}>{ item.role.name }</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <button type="button" className="btn btn-sm btn-primary" onClick={()=>saveUer()}>Submit</button>
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