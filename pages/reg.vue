<template>
<ul>
    <li v-for="todo in todos">
        <input type="checkbox" :checked="todo.done">
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </li>
    <li><input placeholder="What needs to be done?" v-model="txt" @keyup.enter="addTodo(txt)"></li>
</ul>
</template>

<script>
import {
    mapMutations,
    mapGetters,
    mapActions
} from 'vuex'

export default {
    data: function () {
        return {
            count: 0,
            txt: null,
        }
    },

    methods: {
        ...mapActions({
            // `mapActions` also supports payloads:
            // 'incrementBy' // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
            addTodo: 'addTodo'
        }),
    },
    computed: mapGetters(['todos/todos']),

    mounted() {
        console.log('mounted')
        setTodo()
    }
}
</script>

<style>
.done {
    text-decoration: line-through;
}
</style>
