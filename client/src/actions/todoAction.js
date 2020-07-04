import Axios from 'axios'

import {TODO_LIST_REQUEST, TODO_LIST_SUCCESS, TODO_LIST_FAIL,CREATE_TODO_REQUEST, CREATE_TODO_SUCCESS, CREATE_TODO_FAIL,
  TODO_DELETE_REQUEST,
  TODO_DELETE_SUCCESS,
  TODO_DELETE_FAIL} from '../constants/todocontanst'




  const listMytodo = () => async (dispatch, getState) => {
    try {
      dispatch({ type: TODO_LIST_REQUEST });
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.get('/api/todo/me/'+userInfo._id, {
        headers: {
          Authorization: userInfo.token,
        },
      });
  
      dispatch({ type: TODO_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: TODO_LIST_FAIL, payload: error.message });
    }
  };


  



  const createTodo = (description) => async (dispatch,getState) => {
   
    try {
      dispatch({ type: CREATE_TODO_REQUEST, payload: {description} });
        const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.post('/api/todo/',{description},
      
      {
        headers: { Authorization:userInfo.token },
      });
      dispatch({ type: CREATE_TODO_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CREATE_TODO_FAIL, payload: error.message });
    }
  };


  const deleteTodo = (todoId) => async (dispatch, getState) => {
    try {
      dispatch({ type: TODO_DELETE_REQUEST, payload: todoId });
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.delete('/api/todo/' + todoId, {
        headers: { Authorization: userInfo.token },
      });
      dispatch({ type: TODO_DELETE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: TODO_DELETE_FAIL, payload: error.message });
    }
  };
  const completeTodo = (todoId) => async (dispatch, getState) => {
    try {
      dispatch({ type: TODO_DELETE_REQUEST, payload: todoId });
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.put('/api/todo/complete/' + todoId,null, {
        headers: { Authorization:userInfo.token },
      });
      dispatch({ type: TODO_DELETE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: TODO_DELETE_FAIL, payload: error.message });
    }
  };

  export {listMytodo, createTodo,deleteTodo,completeTodo}