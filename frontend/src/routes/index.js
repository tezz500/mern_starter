import { createBrowserRouter } from "react-router-dom";
import OrginTemplate from "../components/layouts/OriginTemplate";
import ForbiddenComponent from "../components/backend/errors/ForbiddenComponent";
import BackendTemplate from "../components/backend/layouts/BackendTemplate";
import BackendDashboard from '../components/backend/BackendDashboard';
import UserFormComponent from '../components/backend/user/UserFormComponent';
import UserTableComponent from "../components/backend/user/UserTableComponent";
import RoleFormComponent from '../components/backend/user/role/RoleFormComponent';
import RoleTableComponent from "../components/backend/user/role/RoleTableComponent";

import LoginPage from "../components/layouts/auth/LoginPageComponent";
const router = createBrowserRouter([
    {
        path: "/admin",
        element: <BackendTemplate />,
        children: [
            {
              path: "dashboard",
              element: <BackendDashboard />,
            },
            {
                pathname:"role",
                path: "role",
                element: <RoleTableComponent />,
            },
            {
                pathname:"user-create",
                path: "user/create",
                element: <RoleFormComponent />,
            },
            {
                pathname:"user",
                path: "user",
                element: <UserTableComponent />,
            },
            {
                pathname:"user-create",
                path: "user/create",
                element: <UserFormComponent />,
            },
        ],
    },
    {
        path: "/",
        element: <OrginTemplate />,
        children: [
            {
              path: "login",
              element: <LoginPage />,
            },
            {
                pathname:"forbidden",
                path: "forbidden",
                element: <ForbiddenComponent />,
            },
        ],
    },
]);

export default router;