import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import Description from "../description";
import Author from "../author";
import {deleteArticle} from "../pages/article-page/actions";
import {toggleFavorite} from "./actions";
import getArticlePropTypes from "../../utils/get-article-prop-types";
import favoriteTrueImage from "../description/img/fav-true.svg";
import favoriteFalseImage from "../description/img/fav-false.svg";
import styles from "./Article.module.scss";

function Article({content, fullSize}) {
    const {
        author,
        body,
        createdAt,
        description,
        favorited,
        favoritesCount,
        slug,
        tagList,
        title,
    } = content;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
    const username = useSelector(state => state.authentication.user?.username);

    const [liked, setLiked] = useState(favorited);

    const isMyArticle = author.username === username;

    const onFavoriteArticle = () => {
        let value = !liked;
        setLiked(value);
        dispatch(toggleFavorite(slug, value));
    };

    const onDeleteArticle = () => {
        dispatch(deleteArticle(slug))
            .then(navigate('/articles'));
    };

    let articleTitle = <h3>{title}</h3>;
    if (!fullSize) {
        articleTitle = (
            <Link to={`/articles/${slug}`}>
                {articleTitle}
            </Link>
        );
    }

    const tags = tagList.map((tag, index) => {
        const key = `${slug}${index}`;

        return (
            <div className={styles.tag} key={key}>
                <p>{tag}</p>
            </div>
        );
    });

    const favoriteImgSrc = liked ? favoriteTrueImage : favoriteFalseImage;

    let favoriteImg = <img className={styles.favoriteButtonImg}
                           alt="like" src={favoriteImgSrc} />;

    if (isLoggedIn) {
        favoriteImg = (
            <button className={styles.favoriteButton} type="button"
                onClick={onFavoriteArticle} disabled={!isLoggedIn}>
                {favoriteImg}
            </button>
        )
    }

    const descriptionProps = {
        articleTitle,
        description,
        favoriteImg,
        favorited,
        favoritesCount,
        isLoggedIn,
        slug,
        tags,
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
        </article>);

    return (
        <article className={styles.content}>
            <Description {...descriptionProps} />
            <Author {...authorProps} />
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
