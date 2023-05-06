import React from "react";
// import {connect} from "react-redux";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Article from "../../article";
import Spinner from "../../spinner";
// import ErrorIndicator from "../../error-indicator";
// import {reducer} from "../../articles/reducer";
import styles from "./ArticlePage.module.scss";

function ArticlePage() {
    const {slug} = useParams();
    const isFetching = useSelector(state => state.articles.articleFetching);
    // const [hasError, setHasError] = useState(false);

    // if (hasError) {return <ErrorIndicator />;}
    if(isFetching) {return <Spinner />}

    return (
        <section>
            <div className={styles.container}>
                <Article slug={slug} />
            </div>
        </section>
    )
}
//
// export default connect(
//     null,
//     {articles: reducer})(ArticlePage);
export default ArticlePage;
