<template>
	<!-- <div class="card mt-2"
		v-for="(todo, index) in todos" :key="todo.id"> -->
	<List :items="todos">
		<template v-slot:default="{ item, index }">
			<div class="card-body p-2 d-flex align-items-center"
				style="cursor: pointer;"
				@click="moveToPage(item.id)">
				<div class="flex-grow-1">
					<input type="checkbox" class="ml-2 mr-2"
						:checked="item.completed" @change="toggleTodo(index, $event)"
						@click.stop>
					<span :style="item.completed ? todoStyle: {}">
						{{ item.subject }}
					</span>
				</div>
				<div>
					<button class="btn btn-danger btn-sm" 
						@click.stop="openModal(item.id)">Delete</button>
				</div>
			</div>
		</template>
	</List>
	<DeleteModal v-if="showModal" @close="closeModal" @delete="deleteTodo" />
</template>

<script>
import { useRouter } from 'vue-router';
import DeleteModal from '@/components/DeleteModal.vue'
import { ref } from 'vue'
import List from '@/components/List.vue'
export default {
	props: {
		todos: {
			type: Array,
			required: true
		},
	},
	components: {
		List, DeleteModal
	},
	emits: ['toggle-todo', 'delete-todo'],
	setup(props, { emit }) {
		const router = useRouter();
		const showModal = ref(false)
		const todoDeleteId = ref(null)
		const todoStyle = {
			textDecoration: 'line-through',
			color: 'grey'
		}

		const toggleTodo = (index, event) => {
			emit('toggle-todo', index, event.target.checked);
		}

		function openModal(id) {
			todoDeleteId.value = id;
			showModal.value = true;
		}

		function closeModal() {
			todoDeleteId.value = null;
			showModal.value = false;
		}

		function deleteTodo() {
			emit('delete-todo', todoDeleteId.value);
			todoDeleteId.value = null;
			showModal.value = false;
		}

		const moveToPage = (todoId) => {
			router.push('/todos/' + todoId);
		}

		return {
			todoStyle, toggleTodo, deleteTodo, moveToPage, showModal,
			openModal, closeModal
		}
	}
}
</script>

<style scoped>

</style>