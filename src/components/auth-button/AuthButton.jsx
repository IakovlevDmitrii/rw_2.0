import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './AuthButton.module.scss';

function AuthButton({to, label}) {
  return (
    <div className={styles.authButton}>
      <NavLink to={to} className={({isActive}) => isActive ? styles.active : ''}>
        {label}
      </NavLink>
    </div>
  );
}

AuthButton.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default AuthButton;
