import { logout } from "../config/firebase";
import { useUserContext } from "../hooks/useUserContext";

const Dashboard = () => {
    const { user } = useUserContext();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1>Dashboard</h1>
            <h2>Bienveido: {user?.name}</h2>
            <p>Email: {user?.email}</p>
            <button type="button" onClick={handleLogout}>
                Logout
            </button>
        </>
    );
};

export default Dashboard;
