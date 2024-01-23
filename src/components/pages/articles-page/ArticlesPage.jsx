import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Article from "../../article";
import Spinner from "../../spinner";
import Pagination from "../../pagination";
import {requestArticles, changePageNumber} from "./actions";
import styles from "./ArticlesPage.module.scss";

function ArticlesPage() {
    const dispatch = useDispatch();
    const articlesList = useSelector(state => state.articles.list) || [];
    const articlesCount = useSelector(state => state.articles.articlesCount) || 0;
    const isFetching = useSelector(state => state.common.isFetching);
    const currentPage = useSelector(state => state.articles.currentPage);

    useEffect(
       () => {
           dispatch(requestArticles(5, currentPage));
       }, [currentPage]
    )

    const listToShow = articlesList.map(article => (
        <Article key={article.slug} content={article} fullSize={false} />
    ));

    if(isFetching) {
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

export default ArticlesPage;
