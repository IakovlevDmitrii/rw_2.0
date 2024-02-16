import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Article from '../../article';
import Spinner from '../../spinner';
import ErrorIndicator from '../../error-indicator';
import { requestArticle } from './actions';
import styles from './ArticlePage.module.scss';

function ArticlePage() {
  const {slug} = useParams();
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(true);
  const [hasError, setHasError] = useState(false);
  const {list} = useSelector(state => state.articles);
  const article = list.find(item => item.slug === slug);

  useEffect(() => {
    if (article) {
      setIsFetching(false);
    } else {
      setIsFetching(true);
      dispatch(requestArticle(slug)).then(res => res ? setIsFetching(false) : setHasError(true));
    }

    return () => {
      setIsFetching(true);
      setHasError(false);
    };
  }, [dispatch, slug, article]);

  if (hasError) {
    return <ErrorIndicator />;
  }

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <section>
      <div className={styles.container}>
        <Article content={article} fullSize />
      </div>
    </section>
  );
}

export default ArticlePage;
