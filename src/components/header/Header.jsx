import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthButton from '../auth-button';
import { logOut } from './actions';
import userImageDefaultSource from './img/user-image-default.png';
import styles from './Header.module.scss';

function Header() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.common.currentUser);
  const isLoggedIn = useSelector(state => state.common.isLoggedIn);

  const buttonsForDisplay = isLoggedIn ? (
    <>
      <div className={styles.articleButton}>
        <Link to="/new-article">Create article</Link>
      </div>
      <div className={styles.person}>
        <Link to="/profile">
          <div className={styles.personName}>{currentUser.username}</div>
          <div className={styles.personImage}>
            <img src={`${currentUser.image}` || `${userImageDefaultSource}`} alt="user's avatar" />
          </div>
        </Link>
      </div>
      <button type="button" className={styles.logOut} onClick={() => dispatch(logOut())}>
        Log Out
      </button>
    </>
  ) : (
    <>
      <AuthButton to="/sign-in" label="Sign In" />
      <AuthButton to="/sign-up" label="Sign Up" />
    </>
  );

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Link to="/">RealWorld blog</Link>
          </div>
          {buttonsForDisplay}
        </div>
      </div>
    </header>
  );
}

export default Header;
