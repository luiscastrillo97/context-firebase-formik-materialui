import { useRouteError, Link } from "react-router-dom";

const NotFound = () => {
    const error = useRouteError();
    return (
        <div>
            <h1>404</h1>
            <p>Page not found</p>
            <p>{error.statusText || error.message}</p>
            <Link to="/">Go back Login</Link>
        </div>
    );
};

export default NotFound;
