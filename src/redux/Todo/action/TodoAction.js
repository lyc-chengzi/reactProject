/**
 * Created by liuyc14 on 2016/9/23.
 */
import TodoConstant from './TodoConstant';

var TodoAction  = {
    create: function (text) {
        return {
            type: TodoConstant.TODO_CREATE,
            text: text
        };
    },
    /**
     * @param  {string} id The ID of the ToDo item
     * @param  {string} text
     */
    updateText: function(id, text) {
        return {
            type: TodoConstant.TODO_UPDATE_TEXT,
            id: id,
            text: text
        };
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

        return {
            type: actionType,
            id: id
        };
    },

    /**
     * Mark all ToDos as complete
     */
    toggleCompleteAll: function() {
        return {
            type: TodoConstant.TODO_TOGGLE_COMPLETE_ALL
        };
    },
    completeAll: function(complete){
        return {
            type: complete ? TodoConstant.TODO_COMPLETE_ALL : TodoConstant.TODO_UNDO_COMPLETE_ALL
        };
    },
    /**
     * @param  {string} id
     */
    remove: function(id) {
        return {
            type: TodoConstant.TODO_DESTROY,
            id: id
        };
    },

    /**
     * Delete all the completed ToDos
     */
    removeCompleted: function() {
        return {
            type: TodoConstant.TODO_DESTROY_COMPLETED
        };
    }
};

export default TodoAction;
