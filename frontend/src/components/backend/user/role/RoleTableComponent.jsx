import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { can, logout } from "../../../../helper/helper";
import axios from "../../../../helper/axios";
import Role from "../../../../enum/RoleEnum";

const UserFormComponent = () => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchRoles = useCallback(async () => {
        setLoading(true);
        axios.get('roles')
            .then((response) => {
                setRoles(response.data.data);
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
        fetchRoles();
    }, [fetchRoles]);
    return (
        <div className="container">
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Permissions</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        (!loading && roles.length > 0) &&
                        roles.map((item, index) => {
                            return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.role.name}</td>
                                <td>
                                        <div className="col-md-12">
                                            <div className="row">
                                            {
                                                item.permissions.map((permission)=>{
                                                    return (
                                                    <div className="col-md-2">
                                                        <span className={`m-1 badge bg-success text-white`}>{ permission.name }</span>
                                                    </div>
                                                    )
                                                })
                                            }
                                           </div>
                                        </div>
                                </td>
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
                        (!loading && roles.length <= 0) &&
                        <tr>
                            <td colSpan={7}>
                                <center>No Record Found</center>
                            </td>
                        </tr>
                    }

                    {
                        (loading && roles.length <= 0) &&
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