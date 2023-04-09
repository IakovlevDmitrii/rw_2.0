import React, {useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import Article from "../article";
import Spinner from "../spinner";
import Pagination from "../pagination";
import {reducer} from "./reducer";
import {requestArticles} from "./actions";
import styles from "./Articles.module.scss";
// import {useNavigate} from "react-router-dom";
// import ErrorIndicator from "../errors/error-indicator";

function Articles() {
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const isFetching = useSelector(state => state.articles?.isArticlesFetching);
    const articles = useSelector(state => state.articles?.list) || [];
    const articlesCount = useSelector(state => state.articles?.articlesCount) || 0;

    // const [hasError, setHasError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;

    useEffect(
        () => dispatch(requestArticles(limit, currentPage)),
        [currentPage])

    // const onSelectArticle = (slug) => {
    //
    //     dispatchArticle( //TODO: this dispatch should happen when Article gets loaded with router and passes an id(slug) as a property (see below)
    //         articles.find(article => article.slug === slug) // TODO: this is part of the reducer for article
    //     );
    //
    //
    //     navigate('/articles/slug'); //FIXME: should be navigate(`/articles/slug/id=${slug}`)
    // };

    // const onFavoriteArticle = (slug) => {
    //     const index = articles.findIndex(article => article.slug === slug);
    //     const searchedArticle = articles[index];
    //
    //     const { favorited, favoritesCount } = searchedArticle;
    //
    //     const requestMethod = favorited ? "DELETE" : "POST";
    //
    //     const toggleFavorited = () => {
    //         const newFavoritesCount = favorited
    //             ? favoritesCount - 1
    //             : favoritesCount + 1;
    //
    //         const newArticle = {
    //             ...searchedArticle,
    //             favorited: !favorited,
    //             favoritesCount: newFavoritesCount,
    //         };
    //
    //         const newArticles = [
    //             ...articles.slice(0, index),
    //             newArticle,
    //             ...articles.slice(index + 1),
    //         ];
    //
    //         // dispatchArticles(newArticles);
    //     };
    //
    //     // realWorldApiService
    //     //     .articles
    //     //     .favoriteAnArticle(token, slug, requestMethod)
    //     //     .then((res) => {
    //     //         if (res) {
    //     //             toggleFavorited();
    //     //         } else {
    //     //             setHasError(true);
    //     //         }
    //     //     })
    //     //     .catch(() => {
    //     //         setHasError(true);
    //     //     });
    // };

    const listToShow = articles.map(article => {
        const {slug} = article;
        return <Article isPreview key={slug} slug={slug} />
    });

    if (isFetching) {return <Spinner />;}
    // if (hasError) {return <ErrorIndicator />;}

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {listToShow}
                <Pagination
                    current={currentPage}
                    onChange={page =>  setCurrentPage(page)}
                    total={articlesCount}
                />
            </div>
        </div>
    );
}

export default  connect( null, {articles: reducer})(Articles)
