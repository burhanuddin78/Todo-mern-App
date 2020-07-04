import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookies from 'js-cookie';

import {
  userSigninReducer,
  userRegisterReducer,
} from './reducers/userReducers';
import {
  mytodolistReducer,
  createTodoReducer,
  todoDeleteReducer,
  todoCompleteReducer,
} from './reducers/todoreducers';

const userInfo = Cookies.getJSON('userInfo') || null;

const initialState = {
  userSignin: { userInfo },
};

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
  myTodoList: mytodolistReducer,
  todocreate: createTodoReducer,
  deletetodo: todoDeleteReducer,
  completetodo: todoCompleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
