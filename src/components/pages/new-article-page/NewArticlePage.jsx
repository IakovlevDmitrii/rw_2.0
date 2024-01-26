import React, { useState, useEffect, useMemo } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../../protectedRoute';
import ArticleEditor from '../../article-editor';
import Spinner from '../../spinner';
import { createAnArticle } from './actions';
import reducer from '../articles-page/reducer';

function NewArticlePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isFetching = useSelector((state) => state.common.isFetching);
  const [hasErrors, setHasErrors] = useState({});

  const getInitialValues = () => ({
    title: '',
    description: '',
    body: '',
    tagList: [{ value: '' }],
  });

  const initialValues = useMemo(() => getInitialValues(), []);
  const [defaultValues, setDefaultValues] = useState(initialValues);

  useEffect(
    () => () => {
      setDefaultValues(initialValues);
      setHasErrors({});
    },
    [initialValues]
  );

  const onSubmit = (newArticleContent) => {
    dispatch(createAnArticle(newArticleContent)).then((res) => {
      const articleDetails = res.article;
      const serverErrors = res.errors;

      if (articleDetails) {
        navigate(`/articles/${articleDetails.slug}`);
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
            tagList: [{ value: '' }],
          };
        }

        setDefaultValues(newDefaultValues);
        setHasErrors(serverErrors);
      }
    });
  };

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <ProtectedRoute>
      <ArticleEditor
        title="Create new article"
        onFormSubmit={onSubmit}
        defaultValues={defaultValues}
        hasErrors={hasErrors}
      />
    </ProtectedRoute>
  );
}

export default connect(null, { articles: reducer })(NewArticlePage);
