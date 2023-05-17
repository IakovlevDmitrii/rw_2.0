import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Article from "../../article";
import Spinner from "../../spinner";
import {requestArticle} from "./actions";
import styles from "./ArticlePage.module.scss";

function ArticlePage() {
    const {slug} = useParams();
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.articlePage.isFetching);
    const articleContent = useSelector(state => state.articlePage.articleContent);

    useEffect(
        () => {
            dispatch(requestArticle(slug))
        },[slug])

    if(isFetching) {return <Spinner />}

    return (
        <section>
            <div className={styles.container}>
                <Article content={articleContent} fullSize/>
            </div>
        </section>
    )
}

export default ArticlePage;
