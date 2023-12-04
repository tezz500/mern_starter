import { useState, useEffect } from "react";
import axios  from "../../../helper/axios";
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
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Name</td>
                        <td>email@gmail.com</td>
                        <td>9805777500</td>
                        <td>
                            <div className="btn-group">
                                <button className="btn-link btn-sm btn-info m-1">
                                    <i className="fa fa-edit"></i>
                                </button>
                                <button className="btn-link btn-sm btn-danger m-1">
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
       </div>
    )
}

export default UserFormComponent;