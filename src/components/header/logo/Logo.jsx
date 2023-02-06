import React from 'react';
import {Link} from "react-router-dom";

import styles from "./Logo.module.scss";

function Logo() {
    return (
        <div className={styles.logo}>
            <Link to="/articles">
                RealWorld blog
            </Link>
        </div>
    )
}

export default Logo;
