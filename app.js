const TodoList = {
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
        <template v-for="todo in todos">
            <slot :todo="todo">
                <li :key="todo.id">
                {{todo.text}}
              </li>
            </slot>
        </template>
    </ul>
  `
}

new Vue({
  el: '#app',
  components: {
    TodoList,
  },
  data: function () {
    return {
      todos: [
        { id: 1, text: 'C#', isCompleted: true },
        { id: 2, text: 'React', isCompleted: false },
        { id: 3, text: 'Java', isCompleted: true },
        { id: 4, text: 'Perl', isCompleted: false },
      ]
    }
  }
})
