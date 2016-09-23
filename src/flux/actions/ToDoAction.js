/**
 * Created by liuyc14 on 2016/9/23.
 */
import AppDispatcher from '../dispatcher/AppDispatcher';
import TodoConstant from '../constants/TodoConstant';

var TodoAction  = {
    create: function (text) {
        AppDispatcher.dispatch({
            actionType: TodoConstant.TODO_CREATE,
            text: text
        });
    },
    /**
     * @param  {string} id The ID of the ToDo item
     * @param  {string} text
     */
    updateText: function(id, text) {
        AppDispatcher.dispatch({
            actionType: TodoConstant.TODO_UPDATE_TEXT,
            id: id,
            text: text
        });
    },

    /**
     * Toggle whether a single ToDo is complete
     * @param  {object} todo
     */
    toggleComplete: function(todo) {
        var id = todo.id;
        var actionType = todo.complete ?
            TodoConstant.TODO_UNDO_COMPLETE :
            TodoConstant.TODO_COMPLETE;

        AppDispatcher.dispatch({
            actionType: actionType,
            id: id
        });
    },

    /**
     * Mark all ToDos as complete
     */
    toggleCompleteAll: function() {
        AppDispatcher.dispatch({
            actionType: TodoConstant.TODO_TOGGLE_COMPLETE_ALL
        });
    },

    /**
     * @param  {string} id
     */
    remove: function(id) {
        AppDispatcher.dispatch({
            actionType: TodoConstant.TODO_DESTROY,
            id: id
        });
    },

    /**
     * Delete all the completed ToDos
     */
    removeCompleted: function() {
        AppDispatcher.dispatch({
            actionType: TodoConstant.TODO_DESTROY_COMPLETED
        });
    }
};

export default TodoAction;
