import { useState, useEffect } from "react";
import { login } from "../config/firebase";
import { useUserContext } from "../hooks/useUserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
    const { user } = useUserContext();
    useRedirectActiveUser(user, "/dashboard");

    const onSubmit = async (
        { email, password },
        { setSubmitting, setErrors, resetForm }
    ) => {
        try {
            const credentialUser = await login({ email, password });
            resetForm();
        } catch (error) {
            console.log(error.code);
            console.log(error.message);
            if (error.code === "auth/user-not-found") {
                setErrors({ email: "Unregistered user" });
            }
            if (error.code === "auth/wrong-password") {
                setErrors({ password: "Incorrect password" });
            }
        } finally {
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email required"),
        password: Yup.string()
            .trim()
            .min(6, "Min. 6 characters")
            .required("Password required"),
    });
    return (
        <>
            <h1>Login</h1>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({
                    values,
                    handleSubmit,
                    handleChange,
                    errors,
                    touched,
                    handleBlur,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Email"
                            value={values?.email}
                            onChange={handleChange}
                            name="email"
                            onBlur={handleBlur}
                        />
                        {errors?.email && touched?.email && errors?.email}
                        <input
                            type="password"
                            placeholder="Password"
                            value={values?.password}
                            onChange={handleChange}
                            name="password"
                            onBlur={handleBlur}
                        />
                        {errors?.password &&
                            touched?.password &&
                            errors?.password}

                        <button type="submit" disabled={isSubmitting}>
                            Login
                        </button>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default Login;
