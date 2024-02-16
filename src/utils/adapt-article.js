import { format } from 'date-fns';

export const adaptArticle = article => {
  const {
    author = {
      image: '',
      username: '',
    },
    body = '',
    createdAt = '',
    description = '',
    favorited = false,
    favoritesCount = 0,
    slug = '',
    tagList = [''],
    title = '',
  } = article;

  return {
    author: {
      image: author.image,
      username: author.username,
    },
    body,
    createdAt: format(new Date(createdAt), 'MMMM d, yyyy'),
    description,
    favorited,
    favoritesCount,
    slug,
    tagList,
    title,
  };
};

export const adaptArticles = articles => articles.map(article => adaptArticle(article));
