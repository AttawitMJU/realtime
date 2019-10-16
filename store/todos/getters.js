import { db } from '~/plugins/firebaseConfig.js'

export const todos = state => {
    let todos = []
    db.collection("todo").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            todos.push(doc.data())
        });
    });
    console.log('-> getters.todos()')
    console.log(todos)
    // state.todoList = todos
    // commit('SET_TODO', todos)
    return state.todoList
    // state.todoList = todos
    // return state.todoList
}

