<template>
	<div class="container">
		<h2>To-Do List</h2>
		<TodoSimpleForm @add-todo="addTodo" />
		<div v-if="!todos.length">
			추가된 Todo가 없습니다
		</div>
		<div class="card mt-2"
			v-for="(todo, index) in todos" :key="todo.id">
			<div class="card-body p-2 d-flex align-items-center">
				<div class="form-check flex-grow-1">
					<input class="form-check-input" type="checkbox" v-model="todo.completed">
					<label class="form-check-label"
						:style="todo.completed ? todoStyle: {}">
						{{ todo.subject }}
					</label>
				</div>
				<div>
					<button class="btn btn-danger btn-sm" @click="deleteTodo(index)">Delete</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
export default {
	components: {
		TodoSimpleForm
	},
  setup() {
		const todos = ref([]);
		const todoStyle = {
			textDecoration: 'line-through',
			color: 'grey'
		}

		const addTodo = (todo) => {
			todos.value.push(todo);
		}

		const updateName = (e) => {
			console.log(e.target.value);
		}

		function deleteTodo(index) {
			todos.value.splice(index, 1);
		}

		return {
			todos, addTodo, updateName, todoStyle, deleteTodo
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
