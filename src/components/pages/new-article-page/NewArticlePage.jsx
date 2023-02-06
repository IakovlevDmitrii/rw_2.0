import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

import actionCreators from "../../../store/action-creators";
import RealWorldApiService from "../../../services";

import ArticleEditor from "../../article-editor";
import Spinner from "../../spinner";

function NewArticlePage(props) {
    const {
        isLoading,
        token,
        dispatchArticle,
        dispatchLoadingArticle,
    } = props;

  const navigate = useNavigate();
  const [hasErrors, setHasErrors] = useState({});

  const getInitialValues = () => ({
    title: "",
    description: "",
    body: "",
    tagList: [{ value: "" }],
  });

  const initialValues = useMemo(() => getInitialValues(), []);
  const [defaultValues, setDefaultValues] = useState(initialValues);

  useEffect(
() => () => {
        dispatchLoadingArticle(false);
        setDefaultValues(initialValues);
    },
[
        initialValues,
        dispatchLoadingArticle,
    ]
  );

  const onSubmit = (newArticleContent) => {
      dispatchLoadingArticle(true);

    RealWorldApiService
      .articles
      .createAnArticle(token, newArticleContent)
      .then((res) => {
            const articleDetails = res.article;
            const serverErrors = res.errors;

          if (articleDetails) {

              dispatchArticle(articleDetails);
              dispatchLoadingArticle(false);
              navigate(`/articles/${articleDetails.slug}`)
        }

        if (serverErrors) {
          let newDefaultValues = {};

          // tagList в newArticleData это массив строк вида ['a', 'b']
          // а в defaultValues надо сохранить tagList в виде [ {value: 'a'}, {value: 'b'} ]
          if (newArticleContent.tagList) {
            const { tagList, ...rest } = newArticleContent;
            newDefaultValues = { ...rest };

            newDefaultValues.tagList = [];
            tagList.forEach((tag) => {
              newDefaultValues.tagList.push({ value: tag });
            });
          } else {
            newDefaultValues = {
              ...newArticleContent,
              tagList: [{ value: "" }],
            };
          }

          setDefaultValues(newDefaultValues);
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

  if(isLoading) {
    return <Spinner />
  }

  return (
    <ArticleEditor
      title="Create new article"
      onFormSubmit={onSubmit}
      defaultValues={defaultValues}
      hasErrors={ hasErrors }
    />
  );
}

NewArticlePage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  dispatchArticle: PropTypes.func.isRequired,
  dispatchLoadingArticle: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = ({ articleData, authentication }) => ({
  isLoading: articleData.isLoading,
  token: authentication.user.token,
});

const mapDispatchToProps = {
    dispatchArticle: actionCreators.articleData.setArticle,
    dispatchLoadingArticle: actionCreators.articleData.loadingArticle,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticlePage);
