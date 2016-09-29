/**
 * Created by liuyc14 on 2016/9/29.
 */
import todo from '../../redux/Todo/TodoReducer';
import action from '../../redux/Todo/TodoAction';
import city from '../../redux/CityReducer';
import counter from '../../redux/CounterReducer';
import {TodoListReducer} from '../../redux/Todo/TodoListReducer';
import * as redux from 'redux';

/*
console.log(todo);
//嵌套结构
let app = redux.combineReducers({
    city: city,
    counter: counter,
    todo: todo
});

let store = redux.createStore(app);

store.subscribe(function(){
    console.log(store.getState());
});

store.dispatch(action.create('第1个任务'));
store.dispatch(action.create('第2个任务'));
store.dispatch(action.create('第3个任务'));
*/
const _todo = function(todo = {}, action){
    return {
        counter: counter(todo.counter, action),
        todos: TodoListReducer(todo.todos, action)
    }
}

const app2 = function(state={}, action){
    return {
        city: city(state.city, action),
        todo: _todo(state.todo, action)
    };
}

let store2 = redux.createStore(app2);
store2.subscribe(function(){
    console.log(store2.getState());
});

store2.dispatch(action.create('第1个任务'));
store2.dispatch(action.create('第2个任务'));
store2.dispatch(action.create('第3个任务'));

store2.dispatch({type:'counter_add'})