import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import ArticleDescription from '../article-description';
import ArticleAuthor from '../article-author';
import Spinner from '../spinner';
import { toggleFavorite, deleteArticle } from './actions';
import getArticlePropTypes from '../../utils/get-article-prop-types';
import favoriteTrueImage from './img/fav-true.svg';
import favoriteFalseImage from './img/fav-false.svg';
import styles from './Article.module.scss';

export default function Article({ content, fullSize }) {
  const { author, body, createdAt, description, favorited, favoritesCount, slug, tagList } = content;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.common.isLoggedIn);
  const currentUser = useSelector((state) => state.common.currentUser.username) || {};
  const isMyArticle = author.username === currentUser;
  const [isFavoriteFetching, setIsFavoriteFetching] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => () => {
    setIsFavoriteFetching(false);
    setIsFetching(false);
  });

  const onFavoriteArticle = () => {
    setIsFavoriteFetching(true);

    dispatch(toggleFavorite(slug, favorited)).then(() => {
      setIsFavoriteFetching(false);
    });
  };

  const onDeleteArticle = () => {
    setIsFetching(true);

    dispatch(deleteArticle(slug)).then(() => {
      setIsFetching(false);
      navigate('/articles');
    });
  };

  const header = <h3>{content.title}</h3>;

  const title = fullSize ? header : <Link to={`/articles/${slug}`}>{header}</Link>;

  const tags = tagList.map((tag, index) => {
    const key = `${slug}${index}`;

    return (
      <div className={styles.tag} key={key}>
        <p>{tag}</p>
      </div>
    );
  });

  const imageSrc = favorited ? favoriteTrueImage : favoriteFalseImage;

  const image = <img className={styles.favoriteButtonImg} alt="like" src={imageSrc} />;

  const favoriteImg = isLoggedIn ? (
    <button
      className={styles.favoriteButton}
      type="button"
      onClick={onFavoriteArticle}
      disabled={!isLoggedIn && isFavoriteFetching}
    >
      {image}
    </button>
  ) : (
    image
  );

  const descriptionProps = {
    description,
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
      <ReactMarkdown>{body}</ReactMarkdown>
    </article>
  );

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <article className={styles.content}>
      <ArticleDescription {...descriptionProps} />
      <ArticleAuthor {...authorProps} />
      {articleContent}
    </article>
  );
}

Article.propTypes = {
  content: PropTypes.shape(getArticlePropTypes()).isRequired,
  fullSize: PropTypes.bool.isRequired,
};
