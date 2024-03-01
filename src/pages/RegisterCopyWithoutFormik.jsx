import { useState } from "react";
import { login, register } from "../config/firebase";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { useUserContext } from "../hooks/useUserContext";

const RegisterCopy = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user } = useUserContext();
    useRedirectActiveUser(user, "/dashboard");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const credentialUser = await register({ email, password });
            // console.log(credentialUser);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1>Register</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit">SignUp</button>
            </form>
        </>
    );
};

export default RegisterCopy;
