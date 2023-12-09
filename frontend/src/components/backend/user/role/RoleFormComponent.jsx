import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../helper/axios";
import { encryptData } from "../../../../helper/helper";

const RoleFormComponent = () => {
    const params = useParams();
    const [role, setRole] = useState({
        name: null,
        permissions: [],
    });
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchRole = useCallback(async () => {
        try {
            const response = await axios.get(`roles/${params.id}`);
            setRole({
                name:response.data.data.role.name,
                _id:response.data.data.role._id,
                permissions:response.data.data.permissions,
            })
        } catch (error) {
            console.error("Error fetching permissions:", error);
        } finally {
            setLoading(false);
        }
    }, [setRole, setPermissions, params.id]);
    

    const fetchPermissions = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get("permissions");
            const updatedPermissions = response.data.data.map((item) => ({
                ...item,
                selected: false,
                permissions: item.permissions.map((permission) => ({
                    ...permission,
                    selected: false,
                })),
            }));
            setPermissions(updatedPermissions);
            if(Object.keys(params).length > 0){
                if(params.id){
                    fetchRole();
                }
            }
        } catch (error) {
            console.error("Error fetching permissions:", error);
        } finally {
            setLoading(false);
        }
    }, [fetchRole]);

    useEffect(() => {
        fetchPermissions();
        if (Object.keys(params).length <= 0) {
            setRole({
                name: null,
                permissions: [],
            });
        }
    }, [fetchPermissions]);



    const handleMainSelectAllCheckboxChange = () => {
        const allSelected = permissions.every((item) => item.selected);

        const updatedPermissions = permissions.map((item) => ({
            ...item,
            selected: !allSelected,
            permissions: item.permissions.map((permission) => ({
                ...permission,
                selected: !allSelected,
            })),
        }));

        setPermissions(updatedPermissions);

        const selectedPermissionIds = updatedPermissions
            .flatMap((item) => item.permissions)
            .filter((permission) => permission.selected)
            .map((permission) => permission._id);

        setRole({
            ...role,
            permissions: selectedPermissionIds,
        });
    };

    const handleParentCheckboxChange = (parentId) => {
        const updatedPermissions = permissions.map((item) => {
            if (item._id === parentId) {
                const allSelected = item.permissions.every((permission) => permission.selected);
                const updatedPermissions = item.permissions.map((permission) => ({
                    ...permission,
                    selected: !allSelected,
                }));
                return {
                    ...item,
                    selected: !allSelected,
                    permissions: updatedPermissions,
                };
            }
            return item;
        });

        setPermissions(updatedPermissions);

        const selectedPermissionIds = updatedPermissions
            .flatMap((item) => item.permissions)
            .filter((permission) => permission.selected)
            .map((permission) => permission._id);

        setRole({
            ...role,
            permissions: selectedPermissionIds,
        });
    };

    const handleChildCheckboxChange = (parentId, childId) => {
        const updatedPermissions = permissions.map((item) => {
            if (item._id === parentId) {
                const updatedPermissions = item.permissions.map((permission) => {
                    if (permission._id === childId) {
                        return {
                            ...permission,
                            selected: !permission.selected,
                        };
                    }
                    return permission;
                });
                return {
                    ...item,
                    permissions: updatedPermissions,
                    selected: updatedPermissions.every((permission) => permission.selected),
                };
            }
            return item;
        });

        setPermissions(updatedPermissions);

        const selectedPermissionIds = updatedPermissions
            .flatMap((item) => item.permissions)
            .filter((permission) => permission.selected)
            .map((permission) => permission._id);

        setRole({
            ...role,
            permissions: selectedPermissionIds,
        });
    };

    const submitForm = () => {
        axios.post('roles', role)
            .then((response) => {
                console.log("This is response ", response);
            }).catch((error) => {
                console.log("this is error ", error);
            }).finally(() => {

            })
    }

    return (
        <div className="col-md-12">

            <form action="#" method="post">
                <div className="card">
                    <div className="card-header">Role Form</div>
                    <div className="card-body">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="name">
                                    Name: <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control form-control-sm"
                                    placeholder="Please Enter Role Name"
                                    value={role.name ?? ''}
                                    onChange={(e) => setRole({ ...role, name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {(!loading && permissions.length > 0) && (
                            <div className="col-md-12">
                                <h4>
                                    <input
                                        type="checkbox"
                                        name="main_select_all"
                                        className="mr-2"
                                        onChange={handleMainSelectAllCheckboxChange}
                                        checked={permissions.every((item) => item.selected)}
                                    />
                                    Select all
                                </h4>
                                <hr />
                                <div className="row">
                                    {permissions.map((item, index) => {
                                        return (
                                            <div className="col-md-4" key={index + encryptData(item._id)}>
                                                <h5>
                                                    <input
                                                        type="checkbox"
                                                        name="main_permisison[]"
                                                        value={item._id}
                                                        className="mr-1"
                                                        onChange={() => handleParentCheckboxChange(item._id)}
                                                        checked={item.selected}
                                                    />
                                                    {item._id}
                                                </h5>
                                                <hr />
                                                {item.permissions.map((permission, i) => {
                                                    return (
                                                        <p key={i + encryptData(permission._id)}>
                                                            <input
                                                                type="checkbox"
                                                                name="permission_id[]"
                                                                value={permission._id}
                                                                checked={(permission.selected || role.permissions.includes(permission._id))}
                                                                onChange={() => handleChildCheckboxChange(item._id, permission._id)}
                                                            />
                                                            {permission.name}
                                                        </p>
                                                    );
                                                })}
                                                <p></p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary btn-sm" type="button" onClick={() => submitForm()}>Save</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RoleFormComponent;
