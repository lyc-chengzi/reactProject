/**
 * Created by liuyc14 on 2016/9/26.
 */
import React from 'react';
import TodoTextInput from './TodoTextInput.react';

export default class TodoHeader extends React.Component{
    constructor(props){
        super(props);
        this.saveHandler = this.saveHandler.bind(this);
    }

    render(){
        return(
            <header id="header">
                <h1>todos</h1>
                <TodoTextInput
                    id="new-todo"
                    placeholder="有什么要做的?"
                    onSave={this.saveHandler}
                />
            </header>
        );
    }

    saveHandler(text){
        //redux注入方法
        this.props.addTodo(text)
    }
}

TodoHeader.propTypes = {
    addTodo: React.PropTypes.func.isRequired
};