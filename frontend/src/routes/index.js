import { createBrowserRouter } from "react-router-dom";
import OrginTemplate from "../components/layouts/OriginTemplate";
import BackendTemplate from "../components/backend/layouts/BackendTemplate";
import BackendDashboard from '../components/backend/BackendDashboard';
import UserFormComponent from '../components/backend/user/UserFormComponent';

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
                pathname:"user",
                path: "user",
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
        ],
    },
]);

export default router;