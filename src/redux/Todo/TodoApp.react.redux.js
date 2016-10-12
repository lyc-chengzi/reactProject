/**
 * Created by liuyc14 on 2016/10/12.
 */
import React from 'react';
import TodoHeader from './containers/TodoHeader.react.redux';
import TodoBody from './containers/TodoBody.react.redux';

export default class TodoApp extends React.Component{
    render(){
        return (
            <div>
                <TodoHeader />
                <TodoBody />
            </div>
        );
    }
}

