import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import Spinner from "../../spinner";
import ArticleEditor from "../../article-editor";

import RealWorldApiService from "../../../services";
import actionCreators from "../../../store/action-creators";

import getArticlePropTypes from "../../../utils/get-article-prop-types";

function EditArticlePage(props) {
    const {
        article,
        dispatchArticle,
        dispatchLoadingArticle,
        isLoading,
        token,
    } = props;

  const [hasErrors, setHasErrors] = useState({});
  const [newArticleContent, setNewArticleContent] = useState("");
  const navigate = useNavigate();

  const { body, description, slug, title } = article;
  const contentToChange = {body, description, title};

  if (article.tagList) {
    contentToChange.tagList = [];

    article.tagList.forEach((tag) => {
      contentToChange.tagList.push({ value: tag });
    });
  } else {
    contentToChange.tagList = [{ value: "" }];
  }

  useEffect(
    () => () => {
      setNewArticleContent("");
    },
    []
  );

  const onSubmit = (detailsToChange) => {
    dispatchLoadingArticle(true);

    RealWorldApiService
      .articles
      .updateAnArticle(token, slug, detailsToChange)
      .then((res) => {
        const articleDetails = res.article;
        const serverErrors = res.errors;

        if (articleDetails) {
          dispatchArticle(articleDetails);
          navigate(`/articles/${slug}`);
        }

        if (serverErrors) {
          const { tagList, ...rest } = detailsToChange;
          const newArticle = { ...rest };
          newArticle.tagList = [];

          tagList.forEach((tag) => {
            newArticle.tagList.push({ value: tag });
          });

          setNewArticleContent(newArticle);
          setHasErrors(serverErrors);
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      })
      .finally(() => {
        dispatchLoadingArticle(false);
      });
  };

  if (isLoading) {
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

EditArticlePage.propTypes = {
  article: PropTypes.shape(getArticlePropTypes()).isRequired,
  dispatchArticle: PropTypes.func.isRequired,
  dispatchLoadingArticle: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = ({ articleData, authentication }) => ({
  article: articleData.article,
  isLoading: articleData.isLoading,
  token: authentication.user.token,
});
const mapDispatchToProps = {
    dispatchArticle: actionCreators.articleData.setArticle,
    dispatchLoadingArticle: actionCreators.articleData.loadingArticle,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticlePage);
