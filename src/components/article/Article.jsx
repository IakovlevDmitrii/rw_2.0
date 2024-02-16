import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import ArticleDescription from '../article-description';
import ArticleAuthor from '../article-author';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import { toggleFavorite, deleteArticle } from './actions';
import getArticlePropTypes from '../../utils/get-article-prop-types';
import favoriteTrueImage from './img/fav-true.svg';
import favoriteFalseImage from './img/fav-false.svg';
import favoriteFetchingImage from './img/fav-fetch.svg';
import styles from './Article.module.scss';

export default function Article({content, fullSize}) {
  const {author, body, createdAt, description, favorited, favoritesCount, slug, tagList} = content;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.common.isLoggedIn);
  const currentUser = useSelector(state => state.common.currentUser.username) || {};
  const isMyArticle = author.username === currentUser;
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingFavorite, setIsFetchingFavorite] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => () => {
    setHasError(false);
  });

  const onFavoriteArticle = () => {
    setIsFetchingFavorite(true);

    dispatch(toggleFavorite(slug, favorited)).then(() => {
      setIsFetchingFavorite(false);
    });
  };

  const onDeleteArticle = () => {
    setIsFetching(true);

    dispatch(deleteArticle(slug)).then((res) => {
      if (!res) {
        setHasError(true);
      }
      navigate('/articles');
      setIsFetching(false);
    });
  };

  if (hasError) {
    return <ErrorIndicator />
  }

  if (isFetching) {
    return <Spinner />
  }

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

  const getSrc = () => {
    if (isFetchingFavorite) {
      return favoriteFetchingImage;
    }
    if (favorited) {
      return favoriteTrueImage;
    }
    return favoriteFalseImage || '';
  }

  const image = <img className={styles.favoriteButtonImg} alt="like" src={getSrc()} />;

  const favoriteImg = isLoggedIn ? (
    <button
      className={styles.favoriteButton}
      type="button"
      onClick={onFavoriteArticle}
      disabled={!isLoggedIn && isFetchingFavorite}
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
