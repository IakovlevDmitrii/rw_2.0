import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import AppLayout from "../appLayout";
import Articles from "../pages/articles-page";
import ArticlePage from "../pages/article-page";
import NewArticlePage from "../pages/new-article-page";
import EditArticlePage from "../pages/edit-article-page";
import {EditProfile, SignIn, SignUp} from "../auth-components";
import "../../styles/styles.module.scss";

function App() {
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
                <Route path='new-article' element={<NewArticlePage />}/>
            </Route>
        </Routes>
    )
}

export default App;
