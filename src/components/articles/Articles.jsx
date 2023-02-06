import React, {
    useCallback, useEffect,
    useRef,
    // createRef,
    useLayoutEffect,
    useState
} from "react";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {gsap} from "gsap";
import Article from "../article";
import Spinner from "../spinner";
import Pagination from "./pagination";
import ErrorIndicator from "../errors/error-indicator";
import realWorldApiService from "../../services";
import actionCreators from "../../store/action-creators";
import getArticlePropTypes from "../../utils/get-article-prop-types";
import styles from "./Articles.module.scss";

function Articles(props) {
    const {
        articles,
        dispatchArticle,
        dispatchArticles,
        dispatchLoadingArticles,
        dispatchPageNumber,
        isLoading,
        isLoggedIn,
        pageNumber,
        token,
        username,
    } = props;

    const [numberOfArticles, setNumberOfArticles] = useState(0);
    const [hasError, setHasError] = useState(false);

    const elementsRef = useRef([]);
    useLayoutEffect(() => {
        let tl = gsap.timeline();

        tl.to(elementsRef.current[0], {
            backgroundColor: "#FAFAFA",
        });
        tl.to(elementsRef.current[1], {
            backgroundColor: "#FAFAFA",
        });
        tl.to(elementsRef.current[2], {
            backgroundColor: "#FAFAFA",
        });
        tl.to(elementsRef.current[3], {
            backgroundColor: "#FAFAFA",
        });
        tl.to(elementsRef.current[4], {
            backgroundColor: "#FAFAFA",
        });
    });

    const onArticleEnter = ({ currentTarget }) => {
        gsap.to(currentTarget, {
            backgroundColor: "#FFFFFF",
            borderTopColor: "#AFAFAF",
            borderBottomColor: "#AFAFAF",
        });
    };
    const onArticleLeave = ({ currentTarget }) => {
        gsap.to(currentTarget, {
            backgroundColor: "#FAFAFA",
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
        });
    };

    const loadArticles = useCallback(() => {
        dispatchLoadingArticles(true);

        realWorldApiService
            .articles
            .getArticles(token, pageNumber)
            .then((response) => {
                setNumberOfArticles(response.articlesCount);
                dispatchArticles(response.articles);
                dispatchArticle({});
            })
            .catch(() => {
                setHasError(true);
            })
            .finally(() => {
                dispatchLoadingArticles(false);
            });
    }, [
        pageNumber,
        dispatchLoadingArticles,
        dispatchArticles,
        dispatchArticle,
    ]);

    useEffect(() => {
        loadArticles();
        return () => {
            setNumberOfArticles(0);
        };
    }, [loadArticles]);

    const navigate = useNavigate();

    const onArticleTitle = (slug) => {
        dispatchArticle(
            articles.find(article => article.slug === slug)
        );

        navigate('/articles/slug');
    };

    const onFavoriteArticle = (slug) => {
        const index = articles.findIndex(article => article.slug === slug);
        const searchedArticle = articles[index];

        const { favorited, favoritesCount } = searchedArticle;

        const requestMethod = favorited ? "DELETE" : "POST";

        const toggleFavorited = () => {
            const newFavoritesCount = favorited
                ? favoritesCount - 1
                : favoritesCount + 1;

            const newArticle = {
                ...searchedArticle,
                favorited: !favorited,
                favoritesCount: newFavoritesCount,
            };

            const newArticles = [
                ...articles.slice(0, index),
                newArticle,
                ...articles.slice(index + 1),
            ];

            dispatchArticles(newArticles);
        };

        realWorldApiService
            .articles
            .favoriteAnArticle(token, slug, requestMethod)
            .then((res) => {
                if (res) {
                    toggleFavorited();
                } else {
                    setHasError(true);
                }
            })
            .catch(() => {
                setHasError(true);
            });
    };

    const listToShow = articles.map((article, i) => (
        <Article
            content={article}
            isLoggedIn={isLoggedIn}
            isPreview
            myArticle={article.author.username === username}
            onArticleTitle={onArticleTitle}
            onFavoriteArticle={onFavoriteArticle}
            onArticleEnter={onArticleEnter}
            onArticleLeave={onArticleLeave}
            key={article.slug}

            parentRef={element => {elementsRef.current[i] = element}}
        />
    ));

    if (isLoading) {return <Spinner />;}
    if (hasError) {return <ErrorIndicator />;}

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {listToShow}
                <Pagination
                    current={pageNumber}
                    onChange={(page) => (dispatchPageNumber(page))}
                    total={numberOfArticles}
                />
            </div>
        </div>
    );
}

Articles.propTypes = {
    articles: PropTypes.arrayOf(
        PropTypes.shape(
            getArticlePropTypes()
        ).isRequired
    ).isRequired,
    dispatchArticle: PropTypes.func.isRequired,
    dispatchArticles: PropTypes.func.isRequired,
    dispatchLoadingArticles: PropTypes.func.isRequired,
    dispatchPageNumber: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    pageNumber: PropTypes.number.isRequired,
    token: PropTypes.string,
    username: PropTypes.string,
};

Articles.defaultProps = {
    token: "",
    username: "",
};

const mapStateToProps = ({authentication, articlesData}) => {
    const {isLoggedIn, user} = authentication;

    const {
        articles,
        isLoading,
        pageNumber,
    } = articlesData;

    return {
        articles,
        isLoading,
        isLoggedIn,
        pageNumber,
        token: user.token,
        username: user.username,
    }
};

const mapDispatchToProps = {
    dispatchArticle: actionCreators.articleData.setArticle,
    dispatchArticles: actionCreators.articlesData.setArticles,
    dispatchLoadingArticles: actionCreators.articlesData.loadingArticles,
    dispatchPageNumber: actionCreators.articlesData.setPageNumber,
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);



// import React, {
//     useCallback, useEffect, useLayoutEffect,
//     useState
// } from "react";
// import {connect} from "react-redux";
// import {useNavigate} from "react-router-dom";
// import PropTypes from "prop-types";
// import {gsap} from "gsap";
// import Article from "../article";
// import Spinner from "../spinner";
// import Pagination from "./pagination";
// import ErrorIndicator from "../errors/error-indicator";
// import realWorldApiService from "../../service";
// import actionCreators from "../../store/action-creators";
// import getArticlePropTypes from "../../utils/get-article-prop-types";
// import styles from "./Articles.module.scss";
//
// function Articles(props) {
//     const {
//         articles,
//         dispatchArticle,
//         dispatchArticles,
//         dispatchLoadingArticles,
//         dispatchPageNumber,
//         isLoading,
//         isLoggedIn,
//         pageNumber,
//         token,
//         username,
//     } = props;
//
//     const [numberOfArticles, setNumberOfArticles] = useState(0);
//     const [hasError, setHasError] = useState(false);
//
//     const onArticleEnter = ({ currentTarget }) => {
//         gsap.to(currentTarget, {
//             backgroundColor: "#FFFFFF",
//             borderTopColor: "#AFAFAF",
//             borderBottomColor: "#AFAFAF",
//         });
//     };
//     const onArticleLeave = ({ currentTarget }) => {
//         gsap.to(currentTarget, {
//             backgroundColor: "#FAFAFA",
//             borderTopColor: "transparent",
//             borderBottomColor: "transparent",
//         });
//     };
//
//     const loadArticles = useCallback(() => {
//         dispatchLoadingArticles(true);
//
//         realWorldApiService
//             .articles
//             .getArticles(token, pageNumber)
//             .then((response) => {
//                 setNumberOfArticles(response.articlesCount);
//                 dispatchArticles(response.articles);
//                 dispatchArticle({});
//             })
//             .catch(() => {
//                 setHasError(true);
//             })
//             .finally(() => {
//                 dispatchLoadingArticles(false);
//             });
//     }, [
//         pageNumber,
//         dispatchLoadingArticles,
//         dispatchArticles,
//         dispatchArticle,
//     ]);
//
//     useEffect(() => {
//         loadArticles();
//         return () => {
//             setNumberOfArticles(0);
//         };
//     }, [loadArticles]);
//
//     const navigate = useNavigate();
//
//     const onArticleTitle = (slug) => {
//         dispatchArticle(
//             articles.find(article => article.slug === slug)
//         );
//
//         navigate('/articles/slug');
//     };
//
//     const onFavoriteArticle = (slug) => {
//         const index = articles.findIndex(article => article.slug === slug);
//         const searchedArticle = articles[index];
//
//         const { favorited, favoritesCount } = searchedArticle;
//
//         const requestMethod = favorited ? "DELETE" : "POST";
//
//         const toggleFavorited = () => {
//             const newFavoritesCount = favorited
//               ? favoritesCount - 1
//               : favoritesCount + 1;
//
//             const newArticle = {
//                 ...searchedArticle,
//                 favorited: !favorited,
//                 favoritesCount: newFavoritesCount,
//             };
//
//             const newArticles = [
//                 ...articles.slice(0, index),
//                 newArticle,
//                 ...articles.slice(index + 1),
//             ];
//
//             dispatchArticles(newArticles);
//         };
//
//         realWorldApiService
//             .articles
//             .favoriteAnArticle(token, slug, requestMethod)
//             .then((res) => {
//                 if (res) {
//                     toggleFavorited();
//                 } else {
//                     setHasError(true);
//                 }
//             })
//             .catch(() => {
//               setHasError(true);
//             });
//     };
//
//     const listToShow = articles.map((article) => (
//         <Article
//             content={article}
//             isLoggedIn={isLoggedIn}
//             isPreview
//             myArticle={article.author.username === username}
//             onArticleTitle={onArticleTitle}
//             onFavoriteArticle={onFavoriteArticle}
//             onArticleEnter={onArticleEnter}
//             onArticleLeave={onArticleLeave}
//             key={article.slug}
//         />
//     ));
//
//     if (isLoading) {return <Spinner />;}
//     if (hasError) {return <ErrorIndicator />;}
//
//     return (
//         <div className={styles.container}>
//             <div className={styles.content}>
//                 {listToShow}
//                 <Pagination
//                     current={pageNumber}
//                     onChange={(page) => (dispatchPageNumber(page))}
//                     total={numberOfArticles}
//                 />
//             </div>
//         </div>
//     );
// }
//
// Articles.propTypes = {
//     articles: PropTypes.arrayOf(
//         PropTypes.shape(
//             getArticlePropTypes()
//         ).isRequired
//     ).isRequired,
//     dispatchArticle: PropTypes.func.isRequired,
//     dispatchArticles: PropTypes.func.isRequired,
//     dispatchLoadingArticles: PropTypes.func.isRequired,
//     dispatchPageNumber: PropTypes.func.isRequired,
//     isLoading: PropTypes.bool.isRequired,
//     isLoggedIn: PropTypes.bool.isRequired,
//     pageNumber: PropTypes.number.isRequired,
//     token: PropTypes.string,
//     username: PropTypes.string,
// };
//
// Articles.defaultProps = {
//     token: "",
//     username: "",
// };
//
// const mapStateToProps = ({authentication, articlesData}) => {
//     const {isLoggedIn, user} = authentication;
//
//     const {
//         articles,
//         isLoading,
//         pageNumber,
//     } = articlesData;
//
//     return {
//         articles,
//         isLoading,
//         isLoggedIn,
//         pageNumber,
//         token: user.token,
//         username: user.username,
//     }
// };
//
// const mapDispatchToProps = {
//     dispatchArticle: actionCreators.articleData.setArticle,
//     dispatchArticles: actionCreators.articlesData.setArticles,
//     dispatchLoadingArticles: actionCreators.articlesData.loadingArticles,
//     dispatchPageNumber: actionCreators.articlesData.setPageNumber,
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(Articles);
