import React from 'react';
import PropTypes from 'prop-types';
import styles from './ArticleDescription.module.scss';

function ArticleDescription(props) {
  const { description, favoriteImg, favoritesCount, tags, title } = props;

  return (
    <article className={styles.description}>
      <div className={styles.info}>
        <header className={styles.header}>
          <div className={styles.title}>{title}</div>
          <div className={styles.favorites}>
            {favoriteImg}
            <div className={styles.favoritesCount}>{favoritesCount}</div>
          </div>
        </header>
        <div className={styles.tags}>{tags}</div>
      </div>
      <div className={styles.text}>
        <p>{description}</p>
      </div>
    </article>
  );
}

ArticleDescription.propTypes = {
  description: PropTypes.string.isRequired,
  favoriteImg: PropTypes.element.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
  title: PropTypes.element.isRequired,
};
export default ArticleDescription;
