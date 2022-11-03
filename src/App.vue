<template>
	<div class="container">
		<h2>To-Do List</h2>
		<input class="form-control" type="type" v-model="searchText" 
			placeholder="Search">
		<hr />
		<TodoSimpleForm @add-todo="addTodo" />
		<div style="color:red;">{{error}}</div>

		<div v-if="!filteredTodos.length">
			There is nothing to display
		</div>
		<TodoList :todos="filteredTodos" @toggle-todo="toggleTodo"
			@delete-todo="deleteTodo" />
	</div>
</template>

<script>
/*
	json-server 실행 명령어
	npx json-server --watch db.json --port 3000
*/
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

		const getTodos = async () => {
			try {
				const res = await axios.get('http://localhost:3000/todos');
				console.log(res.data);
				todos.value = res.data;
			} catch(err) {
				console.log(err);
				error.value = 'Something went wrong.'
			}
		}
		getTodos();

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

		const deleteTodo = async (index) => {
			error.value = '';
			const id = todos.value[index].id;
			try {
				const res = await axios.delete('http://localhost:3000/todos/' + id);
				console.log(res);
				todos.value.splice(index, 1);
			} catch(err) {
				console.log(err);
				error.value = 'Something went wrong.'
			}
		}

		const updateName = (e) => {
			console.log(e.target.value);
		}

		async function toggleTodo(index) {
			error.value = '';
			const id = todos.value[index].id;
			try {
				await axios.patch('http://localhost:3000/todos/' + id, {
					completed: !todos.value[index].completed
				});
				todos.value[index].completed = !todos.value[index].completed;
			} catch (err) {
				console.log(err);
				error.value = 'Something went wrong.'
			}
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
