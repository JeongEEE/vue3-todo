<template>
	<div class="container">
		<h2>To-Do List</h2>
		<input class="form-control" type="type" v-model="searchText" 
			placeholder="Search">
		<hr />
		<TodoSimpleForm @add-todo="addTodo" />
		<div>{{error}}</div>

		<div v-if="!filteredTodos.length">
			There is nothing to display
		</div>
		<TodoList :todos="filteredTodos" @toggle-todo="toggleTodo"
			@delete-todo="deleteTodo" />
	</div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';
export default {
	components: {
		TodoSimpleForm, TodoList
	},
  setup() {
		const todos = ref([]);
		const todoStyle = {
			textDecoration: 'line-through',
			color: 'grey'
		}
		const error = ref('')

		const addTodo = async (todo) => {
			error.value = '';
			try {
				const res = await axios.post('http://localhost:3000/todos', {
					subject: todo.subject,
					completed: todo.completed,
				});
				todos.value.push(res.data);
			} catch(err) {
				console.log(err);
				error.value = 'Something went wrong.'
			}
		}

		const updateName = (e) => {
			console.log(e.target.value);
		}

		function deleteTodo(index) {
			todos.value.splice(index, 1);
		}

		function toggleTodo(index) {
			todos.value[index].completed = !todos.value[index].completed;
		}
		
		const searchText = ref('');
		const filteredTodos = computed(() => {
			if(searchText.value) {
				return todos.value.filter(todo => {
					return todo.subject.includes(searchText.value);
				})
			}
			return todos.value;
		})

		return {
			todos, addTodo, updateName, todoStyle, deleteTodo, toggleTodo,
			searchText, filteredTodos, error
		};
	}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.todo {
	color: grey;
	text-decoration: line-through;
}
</style>
