import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../header";
import styles from "./AppLayout.module.scss";

function AppLayout() {
    return (
        <div className={styles.content}>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default AppLayout;
