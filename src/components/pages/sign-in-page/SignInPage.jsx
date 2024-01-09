import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import {
    // connect,
    useDispatch,
    useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import realWorldApiService from "../../../services";
import actionCreators from "../../../store/action-creators";
import Spinner from "../../spinner";
import FormField from "../../form-field";
import formsConfig from "../../../utils/formsConfig";
import rules from "../../../utils/rules";
import styles from "./SignInPage.module.scss";

function SignInPage() {
    const { requestAuthentication, updateUser } = actionCreators.authentication;
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.authentication.isFetching);
    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
    // const [registered, setRegistered] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({});

    useEffect(
        () => () => {
            requestAuthentication(false);
        },
        [requestAuthentication]
    );

    const onSubmit = ({ email, password }) => {
        dispatch(requestAuthentication(true));

        realWorldApiService
            .authentication
            .existingUserLogin(email, password)
            .then((res) => {
                const userDetails = res.user;
                const serverErrors = res.errors;

                if (userDetails) {
                    dispatch(updateUser(userDetails));
                    // setRegistered(true);
                }

                if (serverErrors) {
                    setError("email", {
                        type: "manual",
                        message: `Email or password ${serverErrors["email or password"]}`,
                    });
                    setError("password", {
                        type: "manual",
                        message: `Email or password ${serverErrors["email or password"]}`,
                    });
                }

            })
            .catch((err) => {
                throw new Error(err.message);
            })
            .finally(() => {
                // requestAuthentication(false);
                dispatch(requestAuthentication(false));
            });
    };

    const validationRules = {
        email: {
            ...rules.required("Email"),
            ...rules.email(),
        },

        password: {
            ...rules.required("Password"),
        },
    };

    const formFields = formsConfig.singIn.map((fieldDetails) => (
        <FormField
            {...fieldDetails}
            register={register}
            validationRules={validationRules[fieldDetails.name]}
            errors={errors}
            key={fieldDetails.name}
        />
    ));

    if (isFetching) {
        return <Spinner />;
    }

    return (
        isLoggedIn ? (
            <Navigate to='/articles' />
        ) : (
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.title}>
                            <h3>Sign In</h3>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {formFields}

                            <button className={styles.formButton} type="submit">
                                Login
                            </button>
                        </form>

                        <div className={styles.authLink}>
                            <div>Don’t have an account?</div>
                            <div className={styles.link}>
                                <Link to="/sign-up">Sign Up.</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    );
}

// SignInPage.propTypes = {
//     loadingAuth: PropTypes.func.isRequired,
//     updateUser: PropTypes.func.isRequired,
// };
//
// const mapDispatchToProps = {
//     loadingAuth: actionCreators.authentication.requestAuthentication,
//     updateUser: actionCreators.authentication.updateUser,
// };

// export default connect(
//     null,
//     mapDispatchToProps)(SignInPage);

export default SignInPage;