import React from "react";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import Article from "../../article";
// import ErrorIndicator from "../../error-indicator";
import {reducer} from "../../articles/reducer";
import styles from "./ArticlePage.module.scss";

function ArticlePage() {
    const {slug} = useParams();
    // const [hasError, setHasError] = useState(false);

    // if (hasError) {return <ErrorIndicator />;}

    return (
        <section>
            <div className={styles.container}>
                <Article slug={slug} />
            </div>
        </section>
    )
}

export default connect(
    null,
    {articles: reducer})(ArticlePage);
