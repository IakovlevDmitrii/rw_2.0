import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

import Description from "./description";
import Author from "./author";

import getArticlePropTypes from "../../utils/get-article-prop-types";
import favoriteTrueImage from "./description/img/fav-true.svg";
import favoriteFalseImage from "./description/img/fav-false.svg";
import styles from "./Article.module.scss";

function Article(props) {

    const {
        content,
        isLoggedIn,
        isPreview,
        myArticle,
        onArticleTitle,
        onFavoriteArticle,
        onDeleteArticle,
        onArticleEnter,
        onArticleLeave,
        parentRef,
    } = props;

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

    const articleTitle = isPreview
        ? (
            <Link
                to={`/articles/${slug}`}
                onClick={ () => {onArticleTitle(slug)} }
            >
                <h3>{title}</h3>
            </Link>
        ) : (
            <h3>{title}</h3>
        );

    const tags = tagList.map((tag, index) => {
        const key = `${slug}${index}`;

        return (
            <div className={styles.tag} key={key}>
                <p>{tag}</p>
            </div>
        );
    });

    const favoriteButton = isLoggedIn
        ? (
            <button
                className={styles.favoriteButton}
                onClick={() => onFavoriteArticle(slug)}
                type="button"
                disabled={!isLoggedIn} >
                <img
                    src={favorited ? favoriteTrueImage : favoriteFalseImage}
                    className={styles.favoriteButtonImg}
                    alt="like"/>
            </button>
        ) : (
            <img
                src={favorited ? favoriteTrueImage : favoriteFalseImage}
                className={styles.favoriteButtonImg}
                alt="like"/>
        );

    const descriptionProps = {
        articleTitle,
        description,
        favoriteButton,
        favorited,
        favoritesCount,
        isLoggedIn,
        onFavoriteArticle,
        slug,
        tags,
    };

    const authorProps = {
        createdAt,
        editable: !isPreview && myArticle,
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
        <article
            className={styles.content}
            onMouseEnter={onArticleEnter}
            onMouseLeave={onArticleLeave}
            ref={parentRef}
        >
            <Description {...descriptionProps} />
            <Author {...authorProps} />
            {articleContent}
        </article>
    );
}

Article.propTypes = {
    content: PropTypes
        .shape(getArticlePropTypes()).isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    onFavoriteArticle: PropTypes.func.isRequired,
    onDeleteArticle: PropTypes.func,
    onArticleTitle: PropTypes.func,
    isPreview: PropTypes.bool,
    myArticle: PropTypes.bool.isRequired,
    onArticleEnter: PropTypes.func,
    onArticleLeave: PropTypes.func,
    parentRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
};

Article.defaultProps = {
    onArticleTitle: null,
    onDeleteArticle: null,
    isPreview: false,
};

export default Article;


// import React from 'react';
// import {Link} from "react-router-dom";
// import PropTypes from "prop-types";
// import ReactMarkdown from "react-markdown";
//
// import Description from "./description";
// import Author from "./author";
//
// import getArticlePropTypes from "../../utils/get-article-prop-types";
// import favoriteTrueImage from "./description/img/fav-true.svg";
// import favoriteFalseImage from "./description/img/fav-false.svg";
// import styles from "./Article.module.scss";
//
// function Article({
//                      content,
//                      isLoggedIn,
//                      isPreview,
//                      myArticle,
//                      onArticleTitle,
//                      onFavoriteArticle,
//                      onDeleteArticle,
//                      onArticleEnter,
//                      onArticleLeave,
// }) {
//     const {
//         author,
//         body,
//         createdAt,
//         description,
//         favorited,
//         favoritesCount,
//         slug,
//         tagList,
//         title,
//     } = content;
//
//     const articleTitle = isPreview
//         ? (
//             <Link
//                 to={`/articles/${slug}`}
//                 onClick={ () => {onArticleTitle(slug)} }
//             >
//                 <h3>{title}</h3>
//             </Link>
//         ) : (
//             <h3>{title}</h3>
//         );
//
//     const tags = tagList.map((tag, index) => {
//         const key = `${slug}${index}`;
//
//         return (
//             <div className={styles.tag} key={key}>
//                 <p>{tag}</p>
//             </div>
//         );
//     });
//
//     const favoriteButton = isLoggedIn
//         ? (
//             <button
//                 className={styles.favoriteButton}
//                 onClick={() => onFavoriteArticle(slug)}
//                 type="button"
//                 disabled={!isLoggedIn} >
//                 <img
//                     src={favorited ? favoriteTrueImage : favoriteFalseImage}
//                     className={styles.favoriteButtonImg}
//                     alt="like"/>
//             </button>
//         ) : (
//             <img
//                 src={favorited ? favoriteTrueImage : favoriteFalseImage}
//                 className={styles.favoriteButtonImg}
//                 alt="like"/>
//         );
//
//     const descriptionProps = {
//         articleTitle,
//         description,
//         favoriteButton,
//         favorited,
//         favoritesCount,
//         isLoggedIn,
//         onFavoriteArticle,
//         slug,
//         tags,
//     };
//
//     const authorProps = {
//         createdAt,
//         editable: !isPreview && myArticle,
//         image: author.image,
//         onDeleteArticle,
//         username: author.username,
//     }
//
//     const articleContent = !isPreview && (
//         <article className={styles.articleContent}>
//             <ReactMarkdown>
//                 {body}
//             </ReactMarkdown>
//         </article>)
//
//     return (
//         <article
//             className={styles.content}
//             onMouseEnter={onArticleEnter}
//             onMouseLeave={onArticleLeave}
//         >
//             <Description {...descriptionProps} />
//             <Author {...authorProps} />
//              {articleContent}
//         </article>
//     );
// }
//
// Article.propTypes = {
//     content: PropTypes
//         .shape(getArticlePropTypes()).isRequired,
//     isLoggedIn: PropTypes.bool.isRequired,
//     onFavoriteArticle: PropTypes.func.isRequired,
//     onDeleteArticle: PropTypes.func,
//     onArticleTitle: PropTypes.func,
//     isPreview: PropTypes.bool,
//     myArticle: PropTypes.bool.isRequired,
//     onArticleEnter: PropTypes.func,
//     onArticleLeave: PropTypes.func,
// };
//
// Article.defaultProps = {
//     onArticleTitle: null,
//     onDeleteArticle: null,
//     isPreview: false,
// };
//
// export default Article;
