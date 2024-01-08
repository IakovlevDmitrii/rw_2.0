import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import ArticleDescription from "../article-description";
import ArticleAuthor from "../article-author";
import {deleteArticle} from "../pages/article-page/actions";
import {toggleFavorite} from "./actions";
import getArticlePropTypes from "../../utils/get-article-prop-types";
import favoriteTrueImage from "./img/fav-true.svg";
import favoriteFalseImage from "./img/fav-false.svg";
import styles from "./Article.module.scss";

function Article({content, fullSize}) {
    const {
        author,
        body,
        createdAt,
        descriptionText,
        favorited,
        favoritesCount,
        slug,
        tagList,
    } = content;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
    const currentUser = useSelector(state => state.authentication.currentUser?.username);
    const isMyArticle = author.username === currentUser;

    const [liked, setLiked] = useState(favorited);


    const onFavoriteArticle = () => {
        let value = !liked;
        setLiked(value);
        dispatch(toggleFavorite(slug, value));
    };

    const onDeleteArticle = () => {
        dispatch(deleteArticle(slug))
            .then(navigate('/articles'));
    };

    const header = (
        <h3>{content.title}</h3>
    );

    const title = fullSize
        ? header
        : (
            <Link to={`/articles/${slug}`}>
                {header}
            </Link>
        );

    const tags = tagList.map((tag, index) => {
        const key = `${slug}${index}`;

        return (
            <div className={styles.tag} key={key}>
                <p>{tag}</p>
            </div>
        );
    });

    const imageSrc = liked ? favoriteTrueImage : favoriteFalseImage;

    const image = (
        <img
            className={styles.favoriteButtonImg}
            alt="like"
            src={imageSrc}
        />
    );

    const favoriteImg = isLoggedIn
        ? (
            <button
                className={styles.favoriteButton}
                type="button"
                onClick={onFavoriteArticle}
                disabled={!isLoggedIn}
            >
                {image}
            </button>
        )
        : image;

    const descriptionProps = {
        descriptionText,
        favoriteImg,
        favorited,
        favoritesCount,
        isLoggedIn,
        slug,
        tags,
        title,
    };

    const authorProps = {
        createdAt,
        editable: fullSize && isMyArticle,
        image: author.image,
        onDeleteArticle,
        username: author.username,
    };

    const articleContent = fullSize && (
        <article className={styles.articleContent}>
            <ReactMarkdown>
                {body}
            </ReactMarkdown>
        </article>
    );

    return (
        <article className={styles.content}>
            <ArticleDescription {...descriptionProps} />
            <ArticleAuthor {...authorProps} />
            {articleContent}
        </article>
    );
}

Article.propTypes = {
    content: PropTypes
        .shape(getArticlePropTypes()).isRequired,
    fullSize: PropTypes.bool.isRequired,
};

export default Article;
