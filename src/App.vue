<template>
	<div class="container">
		<h2>To-Do List</h2>
		<form class="d-flex" @submit.prevent="onSubmit">
			<div class="flex-grow-1 mr-2">
				<input class="form-control" type="type" v-model="todo" placeholder="Type new to-do">
			</div>
			<div>
				<button class="btn btn-primary" type="submit">Add</button>
			</div>
		</form>
		{{todos}}
	</div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
		const todo = ref('');
		const todos = ref([]);

		const onSubmit = () => {
			console.log(todo.value);
			todos.value.push({
				id: Date.now(),
				subject: todo.value
			})
		}

		const updateName = (e) => {
			console.log(e.target.value);
		}

		return {
			todo, todos, onSubmit, updateName
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
.name {
	color: blue;
}
</style>
