import { useState, useEffect } from "react";
import axios  from "../../../../helper/axios";
const UserFormComponent = ()=>{
    const [users, setrUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        fetchUsers();
    }, []);
    const fetchUsers = ()=>{
        setLoading(true);
        axios.get('users')
        .then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>{
            setLoading(false);
        });
    }
    return(
       <div className="container">
            <div className="card">
                <div className="card-header">
                    User Form
                </div>
                <div className="card-body">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="name">Name: <span className="text-danger">*</span></label>
                            <input type="text" name="name" className="form-control form-control-sm" placeholder="Please Enter Full Name" required/>
                        </div>
                    </div>
                </div>
                <div className="card-footer">

                </div>
            </div>
       </div>
    )
}

export default UserFormComponent;