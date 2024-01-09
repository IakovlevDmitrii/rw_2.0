import React from "react";
import { connect, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import realWorldApi from "../../../services";
import actionCreators from "../../../store/action-creators";
import Spinner from "../../spinner";
import FormField from "../../form-field";
import formsConfig from "../../../utils/formsConfig";
import rules from "../../../utils/rules";
import styles from "./EditProfilePage.module.scss";

function EditProfilePage({ loadingAuth, updateUser }) {
    const isFetching = useSelector(state => state.authentication.isFetching);
    const user = useSelector(state => state.authentication.user);
    const { email, username, token } = user;
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const onSubmit = (data) => {
        const detailsToChange = {};

        // Если в data есть заполненные поля сохраним их в detailsToChange
        for (const key in data) {
            if (data[key] && Object.prototype.hasOwnProperty.call(data, key)) {
                detailsToChange[key] = data[key];
            }
        }

        loadingAuth(true);

        realWorldApi
            .authentication
            .updateCurrentUser(token, detailsToChange)
            .then((res) => {
                const userDetails = res.user;
                const serverErrors = res.errors;

                if (userDetails) {
                    updateUser(userDetails);
                    navigate('/articles')
                }

                if (serverErrors) {
                    for (const error in serverErrors) {
                        if (Object.prototype.hasOwnProperty.call(serverErrors, error)) {
                            setError(error, {
                                type: "manual",
                                message: `${error} ${serverErrors[error]}`,
                            });
                        }
                    }
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
        username: {
            ...rules.required("Username"),
        },

        email: {
            ...rules.required("Email"),
            ...rules.email(),
        },

        password: {
            ...rules.minMaxLength("Password", 6, 40),
        },

        avatar: {
            ...rules.avatar(),
        },
    };

    const formFields = formsConfig.editProfile.map((fieldDetails) => {
        const { name } = fieldDetails;
        const addedFieldDetails = fieldDetails;

        if (name === "username") {
            addedFieldDetails.placeholder = username;
        }
        if (name === "email") {
            addedFieldDetails.placeholder = email;
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

    if (isFetching) {
        return <Spinner />;
    }

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.title}>
                        <h3>Edit Profile</h3>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {formFields}
                        <button className={styles.formButton} type="submit">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

EditProfilePage.propTypes = {
    loadingAuth: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    loadingAuth: actionCreators.authentication.requestAuthentication,
    updateUser: actionCreators.authentication.updateUser,
};

export default connect(
    null,
    mapDispatchToProps)(EditProfilePage);