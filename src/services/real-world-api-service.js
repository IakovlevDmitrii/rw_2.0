import {
  createAnArticle,
  deleteAnArticle,
  favoriteAnArticle,
  getArticles,
  updateAnArticle,
  } from "./real-world-api/requests/articles";

import {
  registerANewUser,
  } from "./real-world-api/requests/authentication";

class RealWorldApiService {
  articles = {
    createAnArticle: (token, content) =>
        createAnArticle(token, content),
    deleteAnArticle: (token, slug) =>
        deleteAnArticle(token, slug),
    favoriteAnArticle: (token, slug, method) =>
        favoriteAnArticle(token, slug, method),
    getArticles: (token, page) => getArticles(token, page),
    updateAnArticle: (token, slug, detailsToChange) =>
        updateAnArticle(token, slug, detailsToChange),
  };

  authentication = {
    registerANewUser: (username, email, password) =>
        registerANewUser(username, email, password),
  };
}

const realWorldApiService = new RealWorldApiService();

export default realWorldApiService;
