import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Article from "../../article";
import Spinner from "../../spinner";
import {getArticle} from "./actions";
import styles from "./ArticlePage.module.scss";

function ArticlePage() {
    const {slug} = useParams();
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.articlePage.isFetching);
    const article = useSelector(state => state.articlePage?.article);

    useEffect(
        ()=> {
            dispatch(getArticle(slug));
        },[slug]
    )

    const emptyArticle = Object.keys(article).length === 0;

    if(isFetching || emptyArticle) {
        return <Spinner />
    }

    return (
        <section>
            <div className={styles.container}>
                <Article content={article} fullSize />
            </div>
        </section>
    );
}

export default ArticlePage;
