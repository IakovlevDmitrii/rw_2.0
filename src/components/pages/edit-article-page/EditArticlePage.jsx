import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Spinner from "../../spinner";
import ArticleEditor from "../../article-editor";
import {updateArticle} from "./actions";

function EditArticlePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const article = useSelector(state => state.articlePage.article);
    const isFetching = useSelector(state => state.articlePage.isFetching);
    const [hasErrors, setHasErrors] = useState({});
    const [newArticleContent, setNewArticleContent] = useState("");

    const { body, description, slug, title } = article;
    const contentToChange = {body, description, title};

    if(article.tagList) {
        contentToChange.tagList = [];

        article.tagList.forEach(tag => {
            contentToChange.tagList.push({ value: tag });
        });
    } else {
        contentToChange.tagList = [{ value: "" }];
    }

    useEffect(
        () => () => {
            setNewArticleContent("");
        }, []
    );

    const onSubmit = detailsToChange => {
        dispatch(updateArticle(slug, detailsToChange))
            .then(res => {
                const articleDetails = res.article;
                const serverErrors = res.errors;

                if(articleDetails) {
                    navigate(`/articles/${slug}`);
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

    if(isFetching) {
        return <Spinner />;
    }

    return (
        <ArticleEditor
            title="Edit article"
            onFormSubmit={onSubmit}
            defaultValues={newArticleContent || contentToChange}
            hasErrors={hasErrors}
        />
    );
}

export default EditArticlePage;
