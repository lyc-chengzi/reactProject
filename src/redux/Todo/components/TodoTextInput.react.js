/**
 * Created by liuyc14 on 2016/9/23.
 */
import React from 'react';
let ReactPropTypes = React.PropTypes;
const ENTER_KEY_CODE = 13;

export default class TodoTextInput extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            value: this.props.value || ''
        };

        this.saveHandler = this.saveHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
    }

    render(){
        return (
            <input
                ref="todoTextInputRef"
                className={this.props.className}
                id={this.props.id}
                placeholder={this.props.placeholder}
                value={this.state.value}
                autoFocus={true}
                onBlur={this.saveHandler}
                onChange={this.changeHandler}
                onKeyDown={this.keyDownHandler}
            />
        );
    }

    saveHandler(){
        this.props.onSave(this.refs.todoTextInputRef.value);
        this.setState({
            value: ''
        });
    }

    changeHandler(event){
        this.setState({
            value: event.target.value
        });
    }

    keyDownHandler(event){
        if (event.keyCode === ENTER_KEY_CODE) {
            this.saveHandler();
        }
    }
}


TodoTextInput.propTypes = {
    className: ReactPropTypes.string,
    id: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    onSave: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.string
};