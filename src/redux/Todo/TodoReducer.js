/**
 * Created by liuyc14 on 2016/9/29.
 */
import * as redux from 'redux';
import {TodoListReducer} from './TodoListReducer';

var todoReducer = redux.combineReducers({
    todos: TodoListReducer
});
export default todoReducer;