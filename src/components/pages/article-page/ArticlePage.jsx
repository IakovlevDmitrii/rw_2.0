import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Article from '../../article';
import Spinner from '../../spinner';
import { getArticle } from './actions';
import styles from './ArticlePage.module.scss';

function ArticlePage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.common.isFetching);
  const article = useSelector((state) => state.articles.list.find((item) => item.slug === slug));

  useEffect(() => {
    dispatch(getArticle(slug));
  }, [dispatch, slug]);

  const emptyArticle = Object.keys(article).length === 0;

  if (isFetching || emptyArticle) {
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
