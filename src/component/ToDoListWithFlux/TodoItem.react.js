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
    }

    render(){
        let todo = this.props.todo;

        let input;
        if (this.state.isEditing){
            input =
                <TodoTextInput
                    className="edit"
                    onSave={this._save}
                    value={todo.text}
                />;
        }

    }
}

TodoItem.propTypes = {todo: React.PropTypes.object.isRequired};