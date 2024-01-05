import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import realWorldApiService from "../../../services";
import actionCreators from "../../../store/action-creators";
import Spinner from "../../spinner";
import FormField from "../../form-field";
import formsConfig from "../../../utils/formsConfig";
import rules from "../../../utils/rules";
import styles from "./SignIn.module.scss";

function SignIn({ loadingAuth, updateUser }) {
    const isFetching = useSelector(state => state.authentication.isFetching);
    const [registered, setRegistered] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({});

    useEffect(
        () => () => {
            loadingAuth(false);
        },
        [loadingAuth]
    );

    const onSubmit = ({ email, password }) => {
        loadingAuth(true);

        realWorldApiService
            .authentication
            .existingUserLogin(email, password)
            .then((res) => {
                const userDetails = res.user;
                const serverErrors = res.errors;

                if (userDetails) {
                    updateUser(userDetails);
                    setRegistered(true);
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
                loadingAuth(false);
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
        registered ? (
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

SignIn.propTypes = {
    loadingAuth: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    loadingAuth: actionCreators.authentication.loadingAuth,
    updateUser: actionCreators.authentication.updateUser,
};

export default connect(
    null,
    mapDispatchToProps)(SignIn);
