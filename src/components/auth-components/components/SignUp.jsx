import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import realWorldApiService from "../../../services";
import actionCreators from "../../../store/action-creators";

import Spinner from "../../spinner";
import FormField from "./FormField";

import formsConfig from "../utils/formsConfig";
import rules from "../utils/rules";
import styles from "../styles/authComponents.module.scss";

function SignUp({ isLoading, dispatchLoadingAuth, dispatchUpdateUser }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm({});

  const navigate = useNavigate();

  const onSubmit = ({ username, email, password }) => {
    dispatchLoadingAuth(true);

    realWorldApiService
        .authentication
        .registerANewUser(username, email, password)
        .then((res) => {
          const userDetails = res.user;
          const serverErrors = res.errors;

          if (userDetails) {
            dispatchUpdateUser(userDetails);
            navigate('/articles');
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
          dispatchLoadingAuth(false);
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

  const formFields = formsConfig.singUp.map((fieldDetails) => {
    const { name } = fieldDetails;
    const addedFieldDetails = fieldDetails;

    if (name === "agreement") {
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

  if (isLoading) {
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

SignUp.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  dispatchLoadingAuth: PropTypes.func.isRequired,
  dispatchUpdateUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({authentication}) => ({
  isLoading: authentication.isLoading,
});
const mapDispatchToProps = {
  dispatchLoadingAuth: actionCreators.authentication.loadingAuth,
  dispatchUpdateUser: actionCreators.authentication.updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
