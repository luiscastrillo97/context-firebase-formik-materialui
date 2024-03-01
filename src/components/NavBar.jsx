import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { logout } from "../config/firebase";
import { Button } from "@mui/material";

const NavBar = () => {
    const { user } = useUserContext();
    // setUser(false);
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <nav>
                {!user ? (
                    <>
                        <NavLink to="/">Home</NavLink> |{" "}
                        <NavLink to="/register">Register</NavLink> |{" "}
                    </>
                ) : (
                    <>
                        <NavLink to="/dashboard">Dashboard</NavLink>

                        <Button variant="contained" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                )}
            </nav>
        </>
    );
};

export default NavBar;
