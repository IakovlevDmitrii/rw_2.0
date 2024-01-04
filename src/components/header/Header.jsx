import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import AuthButton from '../auth-button';

import actionCreators from "../../store/action-creators";

import userImageDefaultSource from "./img/user-image-default.png";
import styles from "./Header.module.scss";

function Header({isLoggedIn, user, logOut}) {

    const selectButtonsForDisplay = () => {
        if (isLoggedIn) {
            return (
                <>
                    <div className={styles.articleButton}>
                        <Link to="/new-article">
                            Create article
                        </Link>
                    </div>
                    <div className={styles.person}>
                        <Link to="/profile">
                            <div className={styles.personName}>
                                {user.username}
                            </div>
                            <div className={styles.personImage}>
                                <img
                                    src={user.image || userImageDefaultSource}
                                    alt="user's avatar" />
                            </div>
                        </Link>
                    </div>
                    <button
                        type="button"
                        className={styles.logOut}
                        onClick={logOut}
                    >
                        Log Out
                    </button>
                </>
            );
        }

        return (
            <>
                <AuthButton to='/sign-in' label='Sign In' />
                <AuthButton to='/sign-up' label='Sign Up' />
            </>
        );
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.logo}>
                        <Link to="/articles">
                            RealWorld blog
                        </Link>
                    </div>
                    {selectButtonsForDisplay()}
                </div>
            </div>
        </header>
    )
}

Header.propTypes = {
  user:       PropTypes.shape({
    username:   PropTypes.string,
    image:      PropTypes.string,
  }),
  isLoggedIn: PropTypes.bool.isRequired,
  logOut:     PropTypes.func.isRequired,
};

Header.defaultProps = {
  user: {
    username: "",
    image: "",
  },
};

const mapStateToProps = ({authentication}) => ({
  user: authentication.user,
  isLoggedIn: authentication.isLoggedIn,
});

const mapDispatchToProps = {
  logOut: actionCreators.authentication.logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
