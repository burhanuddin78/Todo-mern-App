import { TODO_LIST_REQUEST, TODO_LIST_FAIL,TODO_LIST_SUCCESS, CREATE_TODO_SUCCESS, CREATE_TODO_REQUEST, CREATE_TODO_FAIL, TODO_DELETE_REQUEST, TODO_DELETE_SUCCESS, TODO_DELETE_FAIL, TODO_COMPLETE_REQUEST, TODO_COMPLETE_SUCCESS, TODO_COMPLETE_FAIL } from '../constants/todocontanst'


function mytodolistReducer(state = { todos: [] }, action) {
    switch (action.type) {
      case TODO_LIST_REQUEST:
        return { loading: true, todos: [] };
      case TODO_LIST_SUCCESS:
        return { loading: false, todos: action.payload };
      case TODO_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  }

  function createTodoReducer(state = {}, action) {
    switch (action.type) {
      case CREATE_TODO_REQUEST:
        return { loading: true };
      case CREATE_TODO_SUCCESS:
        return { loading: false, success:true };
      case CREATE_TODO_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  function todoDeleteReducer(
    state = {}, action  ) {
    switch (action.type) {
      case TODO_DELETE_REQUEST:
        return { loading: true };
      case TODO_DELETE_SUCCESS:
        return { loading: false, success: true };
      case TODO_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  function todoCompleteReducer(
    state = {}, action  ) {
    switch (action.type) {
      case TODO_COMPLETE_REQUEST:
        return { loading: true };
      case TODO_COMPLETE_SUCCESS:
        return { loading: false, success: true };
      case TODO_COMPLETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }


  


  export{mytodolistReducer,createTodoReducer,todoDeleteReducer,todoCompleteReducer}