import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

const PrivateLayout = () => {
    const { user } = useUserContext();

    return <>{user ? <Outlet /> : <Navigate to="/" />}</>;
};

export default PrivateLayout;
