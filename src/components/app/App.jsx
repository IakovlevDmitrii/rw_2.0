import React from "react";
import {useSelector} from "react-redux";
import {Routes, Route, Navigate} from "react-router-dom";
import AppLayout from "../appLayout";
import Articles from "../articles";
import ArticlePage from "../pages/article-page";
import NewArticlePage from "../pages/new-article-page";
import EditArticlePage from "../pages/edit-article-page";
import {EditProfile, SignIn, SignUp} from "../auth-components";
import ProtectedRoute from "../protectedRoute";
import "../../styles/styles.module.scss";

function App() {
    const isLoggedIn = useSelector((store) => {
        const {authentication} = store;
        return authentication.isLoggedIn;
    });

    return (
        <Routes>
            <Route path='/' element={<AppLayout />}>
                <Route path='/' element={<Navigate to='articles' />} />
                <Route path='articles' element={<Articles />} />
                <Route path='articles/:slug/*' element={<ArticlePage />} />
                <Route path='articles/:slug/edit' element={<EditArticlePage />} />
                <Route path='sign-in' element={<SignIn />} />
                <Route path='sign-up' element={<SignUp />} />
                <Route path='profile' element={<EditProfile />} />
                <Route path='new-article' element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <NewArticlePage />
                    </ProtectedRoute>}
                />
            </Route>
        </Routes>
    )
}

export default App;
