import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import Spinner from "../../spinner";
import ArticleEditor from "../../article-editor";
import ProtectedRoute from "../../protectedRoute";
import {updateArticle} from "./actions";
import {ARTICLE_FETCHING} from "../article-page/actions";

function EditArticlePage() {
    const {slug} =useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentArticle = useSelector(state => state.articlePage.article);
    const currentUser = useSelector(state => state.authentication.currentUser);
    const isFetching = useSelector(state => state.articlePage.isFetching);
    const [hasErrors, setHasErrors] = useState({});
    const [newArticleContent, setNewArticleContent] = useState("");

    const isMyArticle = currentArticle.author.username === currentUser.username;
    const {body, description, title} = currentArticle;
    const contentToChange = {body, description, title};

    if(currentArticle.tagList) {
        contentToChange.tagList = [];

        currentArticle.tagList.forEach(tag => {
            contentToChange.tagList.push({ value: tag });
        });
    } else {
        contentToChange.tagList = [{ value: "" }];
    }

    useEffect(() => {
        if(!isMyArticle){
            navigate(`/articles/${slug}`);
        }

        dispatch({
            type: ARTICLE_FETCHING,
            payload: {status: false},
        });

        return () => {
            setNewArticleContent("");
            dispatch({
                type: ARTICLE_FETCHING,
                payload: {status: true},
            });
        };
    }, []);

    const onSubmit = detailsToChange => {
        dispatch(updateArticle(currentArticle.slug, detailsToChange))
            .then(res => {
                const articleDetails = res.article;
                const serverErrors = res.errors;

                if(articleDetails) {
                    navigate(`/articles/${currentArticle.slug}`);
                }

                if(serverErrors) {
                    const {tagList, ...rest} = detailsToChange;
                    const newArticle = {...rest};
                    newArticle.tagList = [];

                    tagList.forEach((tag) => {
                        newArticle.tagList.push({value: tag});
                    });

                    setNewArticleContent(newArticle);
                    setHasErrors(serverErrors);
                }
            })
    };

    if(isFetching || !isMyArticle) {
        return <Spinner />;
    }

    return (
        <ProtectedRoute>
            <ArticleEditor
                title="Edit article"
                onFormSubmit={onSubmit}
                defaultValues={newArticleContent || contentToChange}
                hasErrors={hasErrors}
            />
        </ProtectedRoute>
    );
}

export default EditArticlePage;
