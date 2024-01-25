import { combineReducers } from 'redux';
import commonReducer from './common-reducer';
import articlesReducer  from '../../components/pages/articles-page/reducer';

const reducer = combineReducers({
  articles: articlesReducer,
  common: commonReducer,
});

export default reducer;
