import React, {useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import Article from "../article";
import Spinner from "../spinner";
import Pagination from "../pagination";
import {reducer} from "./reducer";
import {requestArticles} from "./actions";
import styles from "./Articles.module.scss";
// import ErrorIndicator from "../errors/error-indicator";

function Articles() {
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.articles?.articlesFetching);
    const articles = useSelector(state => state.articles?.list) || [];
    const articlesCount = useSelector(state => state.articles?.articlesCount) || 0;

    // const [hasError, setHasError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;

    useEffect(
        () => dispatch(requestArticles(limit, currentPage)),
        [currentPage])

    const listToShow = articles.map(article => {
        return <Article isPreview key={article.slug} slug={article.slug} />
    });

    if (isFetching) {return <Spinner />;}
    // if (hasError) {return <ErrorIndicator />;}

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {listToShow}
                <Pagination
                    current={currentPage}
                    onChange={page => setCurrentPage(page)}
                    total={articlesCount} />
            </div>
        </div>
    );
}

export default connect(
    null,
    {articles: reducer})(Articles)
