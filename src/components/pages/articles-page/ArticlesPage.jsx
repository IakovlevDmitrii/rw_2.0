import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Article from '../../article';
import Spinner from '../../spinner';
import ErrorIndicator from '../../error-indicator';
import Pagination from '../../pagination';
import { requestArticles, changePageNumber } from './actions';
import styles from './ArticlesPage.module.scss';

function ArticlesPage() {
  const dispatch = useDispatch();
  const articlesList = useSelector(state => state.articles.list);
  const articlesCount = useSelector(state => state.articles.articlesCount);
  const currentPage = useSelector(state => state.articles.currentPage);
  const [isFetching, setIsFetching] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(
    () => {
      setIsFetching(true);

      dispatch(requestArticles(5, currentPage))
        .then(res => {
          if(res.isArticlesReceived) {
            setIsFetching(false);
          }
        })
        .catch(res => {
          if(res.hasError) {
            setHasError(true);
          }
        });

      return () => {
        setHasError(false);
      };
    }, [currentPage, dispatch]
  )

  if(hasError) {
    return <ErrorIndicator errorMessage="Ошибка при получении данных с сервера" />
  }
  if(isFetching) {
    return <Spinner />;
  }

  const listToShow = articlesList.map(article => (
    <Article key={article.slug} content={article} fullSize={false} />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {listToShow}

        <Pagination
          current={currentPage}
          onChange={page => dispatch(changePageNumber(page))}
          total={articlesCount}
        />
      </div>
    </div>
  );
}

export default ArticlesPage;
