import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import attentionImageSrc from './img/attention.svg';
import styles from './ArticleAuthor.module.scss';

function ArticleAuthor(props) {
  const { createdAt = '', editable, image, onDeleteArticle, username } = props;

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const popUp = (
    <div className={styles.popUp}>
      <div className={styles.popUpText}>
        <img src={attentionImageSrc} alt="attention" />
        <span>Are you sure to delete this article?</span>
      </div>

      <div className={styles.popUpButtons}>
        <button className={styles.popUpNo} onClick={() => setIsPopUpOpen(false)} type="button">
          No
        </button>
        <button className={styles.popUpYes} onClick={() => onDeleteArticle()} type="button">
          Yes
        </button>
      </div>
    </div>
  );

  const buttons = (
    <div className={styles.buttons}>
      <button className={styles.deleteArticleButton} onClick={() => setIsPopUpOpen(true)} type="button">
        Delete
      </button>

      {isPopUpOpen && popUp}

      <Link to="edit" className={styles.editArticleButton}>
        Edit
      </Link>
    </div>
  );

  return (
    <article className={styles.author}>
      <div className={styles.details}>
        <div className={styles.info}>
          <div className={styles.name}>{username}</div>
          {createdAt && <div className={styles.created}>{createdAt}</div>}
        </div>
        <div className={styles.image}>
          <img src={image} alt="user's avatar" />
        </div>
      </div>
      {editable && buttons}
    </article>
  );
}

ArticleAuthor.propTypes = {
  createdAt: PropTypes.string.isRequired,
  onDeleteArticle: PropTypes.func,
  image: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
};

ArticleAuthor.defaultProps = {
  onDeleteArticle: null,
};

export default ArticleAuthor;
