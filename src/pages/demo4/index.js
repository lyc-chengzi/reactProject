/**
 * Created by liuyc14 on 2016/9/29.
 */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from '../../component/TodoListWithRedux/reducers'
import App from '../../component/TodoListWithRedux/components/App'

let store = createStore(todoApp);

store.subscribe(function(){
    console.log(store.getState());
});

var app = render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('todoapp')
);
console.log(app);