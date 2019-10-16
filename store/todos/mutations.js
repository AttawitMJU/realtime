export default {
    ADD_TODO(state, { todo }) {
        state.todoList.unshift({
            text: todo.text,
            done: false
        })
    },
    REMOVE_TODO(state, { todo }) {
        state.todoList.splice(state.todoList.indexOf(todo), 1)
    },
    SET_TODO(state, todos) {
        state.todoList = todos
    }
}
