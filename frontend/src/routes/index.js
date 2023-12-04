import { createBrowserRouter } from "react-router-dom";
import OrginTemplate from "../components/layouts/OriginTemplate";
import LoginPage from "../components/layouts/auth/LoginPageComponent";
const router = createBrowserRouter([
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