import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {signUp} from "./actions";
import Spinner from "../../spinner";
import FormField from "../../form-field";
import formsConfig from "../../../utils/formsConfig";
import rules from "../../../utils/rules";
import styles from "./SignUpPage.module.scss";

function SignUpPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isFetching = useSelector(state => state.common.isFetching);

    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
        watch,
    } = useForm({});

    const onSubmit = ({username, email, password}) => {
        dispatch(signUp(username, email, password))
            .then(res => {
                const {user, errors} = res;

                if(user) {
                    navigate('/articles')
                }

                if(errors) {
                    for(const error in errors) {
                        if(Object.prototype.hasOwnProperty.call(errors, error)) {
                            setError(error, {
                                type: "manual",
                                message: `${error} ${errors[error]}`,
                            });
                        }
                    }
                }
            });
    };

    const validationRules = {
        username: {
            ...rules.required("Username"),
            ...rules.minMaxLength("Username", 3, 20),
        },

        email: {
            ...rules.required("Email"),
            ...rules.email(),
        },

        password: {
            ...rules.required("Password"),
            ...rules.minMaxLength("Password", 6, 40),
        },

        passwordConfirmation: {
            ...rules.required("Repeat Password"),
            ...rules.match(watch('password'), "Your passwords do no match"),
        },

        agreement: {
            ...rules.required("Agreement"),
        },
    };

    const formFields = formsConfig.singUp.map(fieldDetails => {
        const {name} = fieldDetails;
        const addedFieldDetails = fieldDetails;

        if(name === "agreement") {
            addedFieldDetails.extraClassName = styles.agreement;
            addedFieldDetails.id = "agreement";
            addedFieldDetails.labelBehind = true;
        }

        return (
            <FormField
                {...addedFieldDetails}
                register={register}
                validationRules={validationRules[name]}
                errors={errors}
                key={name}
            />
        );
    });

    if(isFetching) {
        return <Spinner />;
    }

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.title}>
                        <h3>Create new account</h3>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {formFields}
                        <button className={styles.formButton} type="submit">
                            Create
                        </button>
                    </form>
                    <div className={styles.authLink}>
                        <div>Already have an account?</div>
                        <div className={styles.link}>
                            <Link to="/sign-in">Sign In.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUpPage;
