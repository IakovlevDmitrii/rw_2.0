import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Article from "../../article";
import Spinner from "../../spinner";
import Pagination from "../../pagination";
import {requestArticles, changePageNumber, RECEIVE_ARTICLES} from "./actions";
import styles from "./HomePage.module.scss";

function HomePage() {
    const dispatch = useDispatch();
    const articlesList = useSelector(state => state.homePage.articlesList) || [];
    const articlesCount = useSelector(state => state.homePage.articlesCount) || 0;
    const isFetching = useSelector(state => state.homePage.isFetching);
    const currentPage = useSelector(state => state.homePage.currentPage);
    const isEmptyListOfArticle = Object.keys(articlesList).length === 0;

    useEffect(
       () => {
           dispatch(requestArticles(5, currentPage));

           return () => {
               dispatch({
                   type: RECEIVE_ARTICLES,
                   payload: {
                       articlesCount: 1,
                       articlesList: [],                   },
               })
           };
       }, [currentPage]
    )

    const listToShow = articlesList.map(article => (
        <Article key={article.slug} content={article} fullSize={false} />
    ));

    if(isFetching || isEmptyListOfArticle) {
        return <Spinner />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {listToShow}

                <Pagination
                    current={currentPage}
                    onChange={page => dispatch(changePageNumber(page))}
                    total={articlesCount}
                />
            </div>
        </div>
    );
}

export default HomePage;
