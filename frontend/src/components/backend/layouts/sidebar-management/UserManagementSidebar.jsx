import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { can} from '../../../../helper/helper';

const UserManagementSidebar = () => {
  const location = useLocation();
  const userManagementPermissions =
    can('read-user') ||
    can('create-user') ||
    can('delete-user') ||
    can('update-user') ||
    can('read-role') ||
    can('create-role') ||
    can('update-role') ||
    can('delete-role');
    
  const isOpenMenu = (location.pathname === '/admin/user' || location.pathname === '/admin/user/*' || location.pathname === '/admin/role' || location.pathname === '/admin/role/*');

  const rolePermissions = can('read-role') || can('create-role') || can('update-role') || can('delete-role');
  const userPermissions = can('read-user') || can('create-user') || can('delete-user') || can('update-user');

  return userManagementPermissions ? (
    <li
      className={`nav-item ${
        isOpenMenu ? 'menu-open' : ''
      }`}
    >
      <Link
        to={'#'}
        className={`nav-link ${location.pathname === '/admin/user' || location.pathname === '/admin/role' ? 'active' : ''}`}
      >
        <i className="nav-icon fas fa-tachometer-alt"></i>
        <p>
          User Management <i className="right fas fa-angle-left"></i>
        </p>
      </Link>

      <ul className="nav nav-treeview">
        {rolePermissions && (
          <li className="nav-item">
            <Link to={'role'} className={`nav-link ${location.pathname === '/admin/role' ? 'active' : ''}`}>
              <i className="far fa-circle nav-icon"></i>
              <p>Role</p>
            </Link>
          </li>
        )}

        {userPermissions && (
          <li className="nav-item">
            <Link to={'user'} className={`nav-link ${location.pathname === '/admin/user' ? 'active' : ''}`}>
              <i className="far fa-circle nav-icon"></i>
              <p>User</p>
            </Link>
          </li>
        )}
      </ul>
    </li>
  ) : null;
};

export default UserManagementSidebar;
