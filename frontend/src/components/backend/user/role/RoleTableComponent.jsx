import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { can, logout, encryptData, checkAuth } from "../../../../helper/helper";
import axios from "../../../../helper/axios";
import Swal from 'sweetalert2'

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

    const deleteRole = (roleId)=>{
        Swal.fire({
            title: "Do you want to Remove ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Remove",
            denyButtonText: `Don't Remove`
        }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`roles/${roleId}`)
            .then((response)=>{
                console.log(response);
                fetchRoles();
                Swal.fire("Deleted!", "", "success");
            }).catch((error)=>{
                Swal.fire("Sorry Internal server error!", "", "error");
            }).finally(()=>{

            })
        } else if (result.isDenied) {
            Swal.fire("Cancelled Deleted", "", "info");
        }
        });
    }

    useEffect(() => {
        if(!checkAuth()){
            logout();
            navigate('/login');
        }
        fetchRoles();
    }, [fetchRoles]);
    return (
        <div className="col-md-12">
            <div className="row mb-2">
                <div className="col-md-12">
                    <Link to={'create'} className="btn btn-sm btn-primary">
                        <i className="fa fa-plus"></i>
                        Create New
                    </Link>
                </div>
            </div>
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
                                <tr key={index+encryptData(item.role.name)}>
                                <td>{index + 1}</td>
                                <td>{item.role.name}</td>
                                <td>
                                        <div className="col-md-12">
                                            <div className="row">
                                            {
                                                item.permissions.map((permission, i)=>{
                                                    return (
                                                    <div className="col-md-2" key={i+encryptData(permission.name)}>
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
                                                    <Link to={`${item.role._id}`} className="btn-sm btn-success m-1">
                                                        <i className="fa fa-edit"></i>
                                                    </Link>
                                                )
                                        }
                                        {
                                            can('delete-user') &&
                                                (
                                                    <button className="btn-sm btn-danger m-1" onClick={()=>deleteRole(item.role._id)}>
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