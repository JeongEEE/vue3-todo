<template>
	<div class="card mt-2"
		v-for="(todo, index) in todos" :key="todo.id">
		<div class="card-body p-2 d-flex align-items-center"
			style="cursor: pointer;"
			@click="moveToPage(todo.id)">
			<div class="flex-grow-1">
				<input type="checkbox" class="ml-2 mr-2"
					:checked="todo.completed" @change="toggleTodo(index, $event)"
					@click.stop>
				<span :style="todo.completed ? todoStyle: {}">
					{{ todo.subject }}
				</span>
			</div>
			<div>
				<button class="btn btn-danger btn-sm" @click.stop="deleteTodo(index)">Delete</button>
			</div>
		</div>
	</div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
	props: {
		todos: {
			type: Array,
			required: true
		},
	},
	emits: ['toggle-todo', 'delete-todo'],
	setup(props, { emit }) {
		const router = useRouter();
		const todoStyle = {
			textDecoration: 'line-through',
			color: 'grey'
		}

		const toggleTodo = (index, event) => {
			emit('toggle-todo', index, event.target.checked);
		}

		function deleteTodo(index) {
			emit('delete-todo', index);
		}

		const moveToPage = (todoId) => {
			router.push('/todos/' + todoId);
		}

		return {
			todoStyle, toggleTodo, deleteTodo, moveToPage
		}
	}
}
</script>

<style scoped>

</style>