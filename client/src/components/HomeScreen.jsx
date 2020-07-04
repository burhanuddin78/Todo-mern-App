import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';

// library for notification
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

import { useSelector, useDispatch } from 'react-redux';

//import Reducers
import { listMytodo } from '../actions/todoAction';
import { createTodo } from '../actions/todoAction';
import { deleteTodo } from '../actions/todoAction';
import { completeTodo } from '../actions/todoAction';

// libraries for icons
import { Pencil } from 'react-bootstrap-icons';
import { Check2 } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';

// npm libraries for spinner
import { CommonLoading } from 'react-loadingg';

import ReactTooltip from 'react-tooltip';

function HomeScreen(props) {
  // get state from store
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  // get state from store
  const todocreate = useSelector((state) => state.todocreate);
  const { loading: loadingCreateTodo, success: success } = todocreate;

  // get state from store
  const deletetodo = useSelector((state) => state.deletetodo);
  const { loading: loadingdelete, success: successdelete } = deletetodo;

  // get state from store
  const completetodo = useSelector((state) => state.completetodo);
  const { loading: loadingcomplete, success: successcomplete } = completetodo;

  // get state from store
  const myTodoList = useSelector((state) => state.myTodoList);
  const { loading: loading, todos: todos } = myTodoList;

  const dispatch = useDispatch();

  const [description, setdescription] = useState('');

  if (!userInfo) {
    props.history.push('/signin');
  }

  useEffect(() => {
    dispatch(listMytodo());
  }, [dispatch, success, successdelete, successcomplete]);

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createTodo(description));
  };

  // Delete handler
  const deleteHandler = (todo) => {
    dispatch(deleteTodo(todo._id));
  };

  // Complete handler
  const completeHandler = (todo) => {
    dispatch(completeTodo(todo._id));
  };

  // Notifications
  const createNotification = (type) => {
    return () => {
      switch (type) {
        case 'success':
          NotificationManager.success('Todo is Created', 'Todo');
          break;
        default:
          break;
      }
    };
  };

  return loading ? (
    <CommonLoading />
  ) : loadingdelete ? (
    <CommonLoading />
  ) : loadingCreateTodo ? (
    <CommonLoading />
  ) : loadingcomplete ? (
    <CommonLoading />
  ) : (
    <div className='container'>
      <div className='row'>
        <div className='col-10 mx-auto col-md-8 mt-5'>
          <h3 className='text-capitalize text-center'>Todo Input</h3>

          {/* Todo input  */}
          <div className='card card-body my-3'>
            <form onSubmit={submitHandler}>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <div className='input-group-text bg-info text-white'>
                    <Pencil />
                  </div>
                </div>
                <input
                  type='text'
                  required
                  className='form-control text-capitalize'
                  placeholder='Add a todo'
                  onChange={(e) => setdescription(e.target.value)}
                />
              </div>
              <button
                type='submit'
                className='btn btn-block btn-info mt-2 btn btn-success'
                onClick={createNotification('success')}>
                Add items
              </button>
              <NotificationContainer />
            </form>
          </div>

          {/* Todo List */}

          <ul className='list-group my-5'>
            <h3 className='text-capitalize text-center '>Your Todo list</h3>

            {todos.map((todo) => (
              <li
                className='list-group-item text-capitlize d-flex justify-content-between my-2'
                key={todo._id}>
                {todo.complete ? (
                  <h6
                    className='text-capitalize '
                    style={{ textDecorationLine: 'line-through' }}>
                    {' '}
                    {todo.description}
                  </h6>
                ) : (
                  <h6 className='text-capitalize '> {todo.description}</h6>
                )}
                <div className='todo-icons '>
                  {!todo.complete ? (
                    <span
                      className='mx-2 text-success'
                      data-tip='Complete'
                      type='button'
                      onClick={() => completeHandler(todo)}>
                      <Check2 color='Green' size={20} />
                      <ReactTooltip />
                    </span>
                  ) : null}
                  <span
                    className='mx-2 text-success'
                    data-tip='Delete'
                    onClick={() => deleteHandler(todo)}
                    size={20}>
                    <Trash color='red' />
                  </span>
                  <ReactTooltip />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
