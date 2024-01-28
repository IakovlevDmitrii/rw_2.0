import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../spinner';
import FormField from '../../form-field';
import editProfile from './actions';
import formsConfig from '../../../utils/formsConfig';
import rules from '../../../utils/rules';
import styles from './EditProfilePage.module.scss';

function EditProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.common.currentUser);
  const { email, username } = currentUser;
  const [isFetching, setIsFetching] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    setIsFetching(true);
    const detailsToChange = {};

    // Если в data есть заполненные поля сохраним их в detailsToChange
    for (const key in data) {
      if (data[key] && Object.prototype.hasOwnProperty.call(data, key)) {
        detailsToChange[key] = data[key];
      }
    }

    dispatch(editProfile(detailsToChange)).then((res) => {
      if (res.user) {
        setIsFetching(false);
        navigate('/articles');
      }

      const serverErrors = res.errors;

      if (serverErrors) {
        for (const err in serverErrors) {
          if (Object.prototype.hasOwnProperty.call(serverErrors, err)) {
            setError(err, {
              type: 'manual',
              message: `${err} ${serverErrors[err]}`,
            });
          }
        }
        setIsFetching(false);
      }
    });
  };

  const validationRules = {
    username: {
      ...rules.required('Username'),
    },

    email: {
      ...rules.required('Email'),
      ...rules.email(),
    },

    password: {
      ...rules.minMaxLength('Password', 6, 40),
    },

    avatar: {
      ...rules.avatar(),
    },
  };

  const formFields = formsConfig.editProfile.map((fieldDetails) => {
    const { name } = fieldDetails;
    const addedFieldDetails = fieldDetails;

    if (name === 'username') {
      addedFieldDetails.placeholder = username;
    }
    if (name === 'email') {
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

export default EditProfilePage;
