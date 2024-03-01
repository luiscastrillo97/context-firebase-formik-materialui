import { login } from "../config/firebase";
import { useUserContext } from "../hooks/useUserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { Formik } from "formik";
import * as Yup from "yup";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import HttpsIcon from "@mui/icons-material/Https";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

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
        <Box
            sx={{
                mt: "4rem",
                maxWidth: "400px",
                mx: "auto",
                textAlign: "center",
            }}
            component="main"
        >
            <Avatar sx={{ mx: "auto", bgcolor: "#9C27B0", my: 1 }}>
                <HttpsIcon />
            </Avatar>

            <Typography variant="h6" component="h1">
                Sign In
            </Typography>

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
                    <Box
                        onSubmit={handleSubmit}
                        sx={{ mt: 4 }}
                        component="form"
                    >
                        <TextField
                            type="text"
                            placeholder="email@example.com"
                            value={values?.email}
                            onChange={handleChange}
                            name="email"
                            onBlur={handleBlur}
                            id="email"
                            label="Email Address *"
                            fullWidth
                            sx={{ mb: 3 }}
                            error={errors?.email && touched?.email}
                            helperText={errors?.email}
                        />
                        <TextField
                            type="password"
                            placeholder="Password *"
                            value={values?.password}
                            onChange={handleChange}
                            name="password"
                            onBlur={handleBlur}
                            id="password"
                            label="Password *"
                            fullWidth
                            sx={{ mb: 3 }}
                            error={errors?.password && touched?.password}
                            helperText={errors?.password}
                        />

                        <LoadingButton
                            type="submit"
                            disabled={isSubmitting}
                            loading={isSubmitting}
                            variant="contained"
                            fullWidth
                            sx={{ mb: 3, bgcolor: "#1976D2" }}
                        >
                            SIGN IN
                        </LoadingButton>

                        <Button
                            fullWidth
                            component={Link}
                            to="/register"
                            sx={{
                                textTransform: "none",
                                textDecoration: "underline",
                            }}
                        >
                            Don't have an account? Sign Up
                        </Button>
                    </Box>
                )}
            </Formik>
        </Box>
    );
};

export default Login;
