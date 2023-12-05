import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { can, logout } from "../../../helper/helper";
import axios from "../../../helper/axios";
import RoleEnum from "../../../enum/RoleEnum";

const UserFormComponent = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        axios.get('users')
            .then((response) => {
                setUsers(response.data.data);
            }).catch((error) => {
                if (error.response.status === 401) {
                    logout();
                    navigate('/login');
                }
                if (error.response.status === 403) {
                    navigate('/forbidden');
                }
            }).finally(() => {
                setLoading(false);
            });
    }, [navigate]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);
    return (
        <div className="container">
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        (!loading && users.length > 0) &&
                        users.map((item, index) => {
                            return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.name}</td>
                                <td>
                                        {item.role === RoleEnum.ADMIN && (<span>Admin</span>)}
                                       { item.role === RoleEnum.AGENT && (<span>Agent</span>)}
                                        {item.role === RoleEnum.USER && (<span>User</span>)}
                                </td>
                                <td>{item.phone}</td>
                                <td>{item.status ?? 'Inactive'}</td>
                                <td>
                                    <div className="btn-group">
                                        {
                                            can('read-user') &&
                                            (
                                                <button className="btn-sm btn-info m-1">
                                                    <i className="fa fa-eye"></i>
                                                </button>
                                            )
                                        }
                                        {
                                            can('update-user') && 
                                            (
                                                <button className="btn-sm btn-success m-1">
                                                    <i className="fa fa-edit"></i>
                                                </button>
                                            )
                                        }
                                        {
                                            can('delete-user') &&
                                            (
                                                <button className="btn-sm btn-danger m-1">
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            )
                                        }
                                    </div>
                                </td>
                            </tr>
                            )
                        })
                    }

                    {
                        (!loading && users.length <= 0) &&
                        <tr>
                            <td colSpan={7}>
                                <center>No Record Found</center>
                            </td>
                        </tr>
                    }

                    {
                        (loading && users.length <= 0) &&
                        <tr>
                            <td colSpan={7}>
                                <center>Loading ..........</center>
                            </td>
                        </tr>
                    }



                </tbody>
            </table>
        </div>
    )
}

export default UserFormComponent;