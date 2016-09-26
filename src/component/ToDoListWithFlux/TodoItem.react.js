/**
 * Created by liuyc14 on 2016/9/23.
 */
import React from 'react';
import TodoAction from '../../flux/actions/TodoAction';
import TodoTextInput from './TodoTextInput.react';

export default class TodoItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isEditing: false
        };

        this.toggleCompleteHandler = this.toggleCompleteHandler.bind(this);
        this.doubleClickHandler = this.doubleClickHandler.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
    }

    render(){
        let todo = this.props.todo;

        let input;
        if (this.state.isEditing){
            input =
                <TodoTextInput
                    className="edit"
                    onSave={this.saveHandler}
                    value={todo.text}
                />;
        }
        var liClass="";
        if(todo.complete){
            liClass += " completed";
        }
        if(this.state.isEditing){
            liClass += " editing";
        }
        return (
            <li className={liClass} key={todo.id}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={todo.complete}
                           onChange={this.toggleCompleteHandler} />
                    <label onDoubleClick={this.doubleClickHandler}>
                        {todo.text}
                    </label>
                    <button className="destroy" onClick={this.removeHandler}></button>
                </div>
                {input}
            </li>
        );
    }

    toggleCompleteHandler(){
        TodoAction.toggleComplete(this.props.todo);
    }

    doubleClickHandler(){
        this.setState({isEditing: true});
    }

    removeHandler(){
        TodoAction.remove(this.props.todo.id);
    }

    saveHandler(text){
        TodoAction.updateText(this.props.todo.id, text);
        this.setState({isEditing: false});
    }
}

TodoItem.propTypes = {todo: React.PropTypes.object.isRequired};