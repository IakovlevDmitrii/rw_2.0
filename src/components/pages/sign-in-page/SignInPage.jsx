import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {signIn} from "./actions";
import Spinner from "../../spinner";
import FormField from "../../form-field";
import formsConfig from "../../../utils/formsConfig";
import rules from "../../../utils/rules";
import styles from "./SignInPage.module.scss";

function SignInPage() {
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.authentication.isFetching);
    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);

    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
    } = useForm({});

    const onSubmit = ({email, password}) => {
        dispatch(signIn(email, password))
            .then(serverErrors => {
                if(serverErrors) {
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

    if(isFetching) {
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

export default SignInPage;
