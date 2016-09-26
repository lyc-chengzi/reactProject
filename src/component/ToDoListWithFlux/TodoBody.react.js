/**
 * Created by liuyc14 on 2016/9/26.
 */
import React from 'react';
import TodoAction from '../../flux/actions/TodoAction';
import TodoItem from './TodoItem.react';

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
        for (var key in todos) {
            list.push(<TodoItem key={key} todo={todos[key]} />);
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
        TodoAction.toggleCompleteAll();
    }
}

TodoBody.propTypes = {
    allTodos: React.PropTypes.object.isRequired,
    areAllComplete: React.PropTypes.bool.isRequired
};
