import React, {useEffect} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import Article from "../../article";
import Spinner from "../../spinner";
import Pagination from "../../pagination";
import {reducer} from "./reducer";
import {requestArticles, changePageNumber} from "./actions";
import styles from "./HomePage.module.scss";

function HomePage() {
    const dispatch = useDispatch();
    const articlesList = useSelector(state => state.homePage?.articlesList) || [];
    const articlesCount = useSelector(state => state.homePage?.articlesCount) || 0;
    const isFetching = useSelector(state => state.homePage.isFetching);
    const currentPage = useSelector(state => state.homePage.currentPage);

    useEffect(
       () => {
           dispatch(requestArticles(5, currentPage))
       }, [currentPage]
    )

    const listToShow = articlesList.map(article => (
        <Article key={article.slug} content={article} fullSize={false} />
    ));

    if (isFetching) {
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

export default connect(
    null,
    {articles: reducer})(HomePage)
