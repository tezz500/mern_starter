import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { can, encryptData, checkAuth, logout } from "../../../helper/helper";
import axios from "../../../helper/axios";
import RoleEnum from "../../../enum/RoleEnum";
import Swal from 'sweetalert2';

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
    const deleteUser = async (id)=>{
        try {
            Swal.fire({
                title: "Do you want Delete?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Delete",
                denyButtonText: `Don't Delete`
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const respose = await axios.delete(`/users/${id}`);
                  await fetchUsers();
                  Swal.fire("Deleted!", "", "success");
                } else if (result.isDenied) {
                  Swal.fire("Changes are not saved", "", "info");
                }
              });
        } catch (error) {
            console.log(error);
        }finally{

        }
    }

    useEffect(() => {
        if(!checkAuth()){
            logout();
            navigate('/login');
        }
        fetchUsers();
    }, [fetchUsers]);

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
                            <tr key={index+encryptData(item.name)}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
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
                                                <Link to={`${item._id}/edit`} className="btn-sm btn-success m-1">
                                                    <i className="fa fa-edit"></i>
                                                </Link>
                                            )
                                        }
                                        {
                                            can('delete-user') &&
                                            (
                                                <button className="btn-sm btn-danger m-1" onClick={()=>deleteUser(item._id)}>
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