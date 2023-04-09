import React from "react";
import PropTypes from "prop-types";
import styles from "./Description.module.scss";

function Description (props) {
    const {
        articleTitle,
        description,
        favoriteImg,
        favoritesCount,
        tags,
    } = props;

    return (
        <article className={styles.article}>
            <div className={styles.info}>
                <header className={styles.header}>
                    <div className={styles.title}>
                        {articleTitle}
                    </div>
                    <div className={styles.favorites}>
                        {favoriteImg}
                        <div className={styles.favoritesCount}>
                            {favoritesCount}
                        </div>
                    </div>
                </header>
                <div className={styles.tags}>
                    {tags}
                </div>
            </div>
            <div className={styles.description}>
                <p>{description}</p>
            </div>
        </article>
    )
}

Description.propTypes = {
    articleTitle: PropTypes.element.isRequired,
    description: PropTypes.string.isRequired,
    favoriteImg: PropTypes.element.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(
        PropTypes.element.isRequired
    ).isRequired,
}
export default Description;
