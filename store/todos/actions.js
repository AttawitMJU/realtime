import { db } from '~/plugins/firebaseConfig.js'

export default {
    // Users
    // autoSignIn({ commit }, payload) {
    //     commit('setUser', payload)
    // },
    addTodo(commit, { todo }) {
        commit("ADD_TODO", todo);
    },
    setTodo(commit, { todos }) {
        commit('SET_TODO', todos)
    },
    nuxtServerInit(commit) {
        console.log('-> Actions.nuxtServerInit()')

        let todos = []
        db.collection("todo").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                todos.push(doc.data())
            });
        });
        console.log('-> Actions.nuxtServerInit.todos[]')
        console.log(todos)
        commit('SET_TODO', todos)
    },
}
