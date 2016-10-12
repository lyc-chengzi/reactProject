/**
 * Created by liuyc14 on 2016/9/26.
 */

import React from 'react';
import TodoAction from '../../flux/actions/TodoAction';

let ReactPropTypes = React.PropTypes;

export default class TodoFooter extends React.Component{
    constructor(props){
        super(props);
        this._onClearCompletedClick = this._onClearCompletedClick.bind(this);
    }
    render() {
        var allTodos = this.props.allTodos;
        var total = Object.keys(allTodos).length;

        if (total === 0) {
            return null;
        }

        var completed = 0;
        for (var key in allTodos) {
            if (allTodos[key].complete) {
                completed++;
            }
        }

        var itemsLeft = total - completed;
        var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
        itemsLeftPhrase += 'left';

        // Undefined and thus not rendered if no completed items are left.
        var clearCompletedButton;
        if (completed) {
            clearCompletedButton =
                <button
                    id="clear-completed"
                    onClick={this._onClearCompletedClick}>
                    清理已完成事项 ({completed})
                </button>;
        }

        return (
            <footer id="footer">
                <span id="todo-count">
                  <strong>
                    {itemsLeft}
                  </strong>
                    {itemsLeftPhrase}
                </span>
                {clearCompletedButton}
            </footer>
        );
    }

    /**
     * Event handler to delete all completed TODOs
     */
    _onClearCompletedClick(){
        TodoAction.removeCompleted();
    }

}

TodoFooter.propTypes = {
    allTodos: ReactPropTypes.object.isRequired
};
