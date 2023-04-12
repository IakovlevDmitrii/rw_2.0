import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import Description from "../description";
import Author from "../author";
import {selectArticle, favoriteArticle, deleteArticle} from "../articles/actions";
import favoriteTrueImage from "../description/img/fav-true.svg";
import favoriteFalseImage from "../description/img/fav-false.svg";
import favoriteFetchImage from "../description/img/fav-fetch.svg";
import styles from "./Article.module.scss";

function Article({slug}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const content = useSelector(state => state.articles.list.find(item => item.slug === slug));
    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
    const username = useSelector(state => state.authentication.user?.username)
    const isFavoriteFetching = useSelector(state => state.articles.favoriteFetching.includes(slug));
    const isPreview = useSelector(state => state.articles.selected !== slug) || false;

    const {
        author,
        body,
        createdAt,
        description,
        favorited,
        favoritesCount,
        tagList,
        title,
    } = content;

    const isMyArticle = author.username === username;

    const onSelectArticle = () => {
        dispatch(selectArticle(slug))};

    const onFavoriteArticle = () => {
        if(!isFavoriteFetching) {
            dispatch(favoriteArticle(slug, favorited))}
    };

    const onDeleteArticle = () => {
        dispatch(deleteArticle(slug))
            .then(navigate('/articles'))
    };

    let articleTitle = <h3>{title}</h3>;
    if (isPreview) {
        articleTitle = (
            <Link to={`/articles/${slug}`} onClick={onSelectArticle}>
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

    const favoriteImgSrc = isFavoriteFetching ? favoriteFetchImage
        : favorited ? favoriteTrueImage
        : favoriteFalseImage

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
        onFavoriteArticle,
        slug,
        tags,
    };

    const authorProps = {
        createdAt,
        editable: !isPreview && isMyArticle,
        image: author.image,
        onDeleteArticle,
        username: author.username,
    }

    const articleContent = !isPreview && (
        <article className={styles.articleContent}>
            <ReactMarkdown>
                {body}
            </ReactMarkdown>
        </article>)

    return (
        <article className={styles.content}>
            <Description {...descriptionProps} />
            <Author {...authorProps} />
            {articleContent}
        </article>
    );
}

Article.propTypes = {
    slug: PropTypes.string.isRequired,
};

export default Article;
