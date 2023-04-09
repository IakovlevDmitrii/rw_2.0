import React, {useState} from "react";
import {connect} from "react-redux";
import {useNavigate,} from "react-router-dom";
import PropTypes from "prop-types";
import Article from "../../article";
import ErrorIndicator from "../../errors/error-indicator";
import realWorldApiService from "../../../services";
import actionCreators from "../../../store/action-creators";
import getArticlePropTypes from "../../../utils/get-article-prop-types";
import styles from "./ArticlePage.module.scss";

function ArticlePage(props) {
    const {
        article,
        isLoggedIn,
        dispatchArticle,
        token,
        username,
    } = props;

    // const { slug } = useParams();

    // const loadArticle = useCallback(() => {
    //     if (slug !== article.slug) {
    //         realWorldApiService
    //             .articles
    //             .getAnArticle(slug)
    //             .then((res) => {
                    // const articleDetails = res.article;
                    // const serverErrors = res.errors;
                    // console.log(res);
                    //
                    // if (articleDetails) {
                    // }
    //             })
    //
    //     }
    // }, [
    //     article.slug,
    //     slug,
    // ])
    //
    // useEffect(() => loadArticle(), [loadArticle]);

    const navigate = useNavigate();
    const [hasError, setHasError] = useState(false);

    const onFavoriteArticle = () => {
        const { favorited, favoritesCount } = article;

        const requestMethod = favorited ? "DELETE" : "POST";

        const toggleFavorited = () => {

            const newFavoritesCount = favorited
                ? favoritesCount - 1
                : favoritesCount + 1;

            dispatchArticle({
                ...article,
                favorited: !favorited,
                favoritesCount: newFavoritesCount,
            });
        };

        realWorldApiService
            .articles
            .favoriteAnArticle(token, article.slug, requestMethod)
            .then((res) => {
                if (res.article) {
                    toggleFavorited();
                } else {
                    setHasError(true);
                }
            })
            .catch(() => {
                setHasError(true);
            });
    };

    const onDeleteArticle = () => {
        realWorldApiService
            .articles
            .deleteAnArticle(token, article.slug)
            .then((res) => {
                if (res) {
                    navigate('/articles')
                } else {
                    setHasError(true);
                }
            })
            .catch(() => {
                setHasError(true);
            });
    };

    if (hasError) {return <ErrorIndicator />;}

    return (
        <section>
            <div className={styles.container}>
                <Article
                    // content={article}
                    slug={article.slug}
                    isLoggedIn={isLoggedIn}
                    isPreview={false}
                    myArticle={article.author.username === username}
                    onFavoriteArticle={onFavoriteArticle}
                    onDeleteArticle={onDeleteArticle}
                />
            </div>
        </section>
    )
}

ArticlePage.propTypes = {
    article: PropTypes.shape(getArticlePropTypes()).isRequired,
    dispatchArticle: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    token: PropTypes.string,
    username: PropTypes.string,
};

ArticlePage.defaultProps ={
    token: "",
    username: "",
}

const mapStateToProps = ({ articles, authentication }) => {
    const {isLoggedIn, user} = authentication;
    const selectedArticleSlug = articles.selected;
    const article = articles.list.find(item => item.slug === selectedArticleSlug)

    return {
        article,
        isLoggedIn,
        token: user.token,
        username: user.username,
    }
};

const mapDispatchToProps = {
    dispatchArticle: actionCreators.articleData.setArticle,
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
