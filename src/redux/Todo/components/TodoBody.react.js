/**
 * Created by liuyc14 on 2016/9/26.
 */
import React from 'react';
import TodoItem from '../components/TodoItem.react';
//import TodoItem from '../containers/TodoItem.react.redux';

export default class TodoBody extends React.Component{
    constructor(props){
        super(props);
        this.toggleAllCompleteHandler = this.toggleAllCompleteHandler.bind(this);
    }

    render(){
        let todos = this.props.allTodos;
        if(Object.keys(todos).length < 1){
            return null;
        }

        let list = [];
        for (var i = 0; i < todos.length; i++) {
            list.push(<TodoItem key={todos[i].id} todo={todos[i]} />);
        }

        return(
            <section id="main">
                <input id="toggle-all" type="checkbox"
                    onChange={this.toggleAllCompleteHandler}
                    defaultChecked={this.props.areAllCompleted ? 'checked' : ''}/>
                <label htmlFor="toggle-all">完成所有</label>
                <ul id="todo-list">{list}</ul>
            </section>
        );
    }

    toggleAllCompleteHandler(){
        this.props.toggleAllComplete();
    }
}

TodoBody.propTypes = {
    allTodos: React.PropTypes.array.isRequired,
    areAllComplete: React.PropTypes.bool.isRequired
};
