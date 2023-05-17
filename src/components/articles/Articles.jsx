import React, {useEffect} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import Article from "../article";
import Spinner from "../spinner";
import Pagination from "../pagination";
import {reducer} from "./reducer";
import {requestArticles, changePage} from "./actions";
import styles from "./Articles.module.scss";

function Articles() {
    const dispatch = useDispatch();
    const articles = useSelector(state => state.articles?.list) || [];
    const articlesCount = useSelector(state => state.articles?.articlesCount) || 0;
    const isFetching = useSelector(state => state.articles.isFetching);
    const currentPage = useSelector(state => state.articles.currentPage);

    useEffect(
       () => {
           dispatch(requestArticles(5, currentPage))
       }, [currentPage])

    const listToShow = articles.map(article => {
        return <Article key={article.slug} content={article} fullSize={false} />
    });

    if (isFetching) {return <Spinner />;}

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {listToShow}
                <Pagination
                    current={currentPage}
                    onChange={page => dispatch(changePage(page))}
                    total={articlesCount} />
            </div>
        </div>
    );
}

export default connect(
    null,
    {articles: reducer})(Articles)
