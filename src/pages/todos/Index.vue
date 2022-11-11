<template>
	<div>
		<div class="d-flex justify-content-between mt-3 mb-3">
			<h2>To-Do List</h2>
			<button class="btn btn-primary"
				@click="moveToCreatePage">Create Todo</button>
		</div>
		<input class="form-control" type="type" v-model="searchText" 
			placeholder="Search" @keyup.enter="searchTodo">
		<hr />

		<div v-if="!todos.length">
			There is nothing to display
		</div>
		<TodoList :todos="todos" @toggle-todo="toggleTodo"
			@delete-todo="deleteTodo" />
		<hr />
		<nav aria-label="Page navigation example">
			<ul class="pagination">
				<li v-if="currentPage !== 1" class="page-item">
					<a class="page-link" @click="getTodos(currentPage - 1)"
						style="cursor:pointer;">Previous</a>
				</li>
				<li class="page-item"
					v-for="page in numberOfPages" :key="page"
					:class="currentPage === page ? 'active' : ''">
					<a class="page-link" @click="getTodos(page)"
						style="cursor:pointer;">{{page}}</a>
				</li>
				<li v-if="currentPage !== numberOfPages" class="page-item">
					<a class="page-link" @click="getTodos(currentPage + 1)"
						style="cursor:pointer;">Next</a>
				</li>
			</ul>
		</nav>
	</div>
	<Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
</template>

<script>
/*
	json-server 실행 명령어
	npx json-server --watch db.json --port 3000
*/
import { ref, computed, watchEffect, watch } from 'vue';
import TodoList from '@/components/TodoList.vue';
import axios from '@/axios';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast'
import { useRouter } from 'vue-router';
export default {
	components: {
		TodoList, Toast
	},
  setup() {
		const router = useRouter();
		const todos = ref([]);
		const error = ref('');
		const numberOfTodos = ref(0);
		const limit = 5;
		const currentPage = ref(1);
		const searchText = ref('');
		const { showToast, toastMessage, toastAlertType, triggerToast } = useToast();

		watch(currentPage, (currentPage, prev) => {
			console.log(currentPage, prev);
		})

		const numberOfPages = computed(() => {
			return Math.ceil(numberOfTodos.value / limit);
		})

		watchEffect(() => {
			console.log(currentPage.value);
		})

		const getTodos = async (page = currentPage.value) => {
			currentPage.value = page;
			try {
				const res = await axios.get(
					`todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
				);
				console.log(res.data);
				numberOfTodos.value = res.headers['x-total-count'];
				todos.value = res.data;
			} catch(err) {
				console.log(err);
				error.value = 'Something went wrong.'
				triggerToast('Something went wrong', 'danger')
			}
		}
		getTodos();

		const addTodo = async (todo) => {
			error.value = '';
			try {
				await axios.post('todos', {
					subject: todo.subject,
					completed: todo.completed,
				});
				getTodos(1);
			} catch(err) {
				console.log(err);
				error.value = 'Something went wrong.'
				triggerToast('Something went wrong', 'danger')
			}
		}

		const deleteTodo = async (id) => {
			error.value = '';
			try {
				await axios.delete('todos/' + id);
				getTodos(1);
			} catch(err) {
				console.log(err);
				error.value = 'Something went wrong.'
				triggerToast('Something went wrong', 'danger')
			}
		}

		const updateName = (e) => {
			console.log(e.target.value);
		}

		async function toggleTodo(index, checked) {
			error.value = '';
			const id = todos.value[index].id;
			try {
				await axios.patch('todos/' + id, {
					completed: checked
				});
				todos.value[index].completed = checked;
			} catch (err) {
				console.log(err);
				error.value = 'Something went wrong.'
				triggerToast('Something went wrong', 'danger')
			}
		}
		
		let timeout = null;
		const searchTodo = () => {
			clearTimeout(timeout);
			getTodos(1);
		};
		watch(searchText, () => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				getTodos(1);
			}, 2000);
		});

		// const filteredTodos = computed(() => {
		// 	if(searchText.value) {
		// 		return todos.value.filter(todo => {
		// 			return todo.subject.includes(searchText.value);
		// 		})
		// 	}
		// 	return todos.value;
		// })

		function moveToCreatePage() {
			router.push({
				name: 'TodoCreate'
			})
		}

		return {
			todos, addTodo, updateName, deleteTodo, toggleTodo, getTodos,
			searchText, error, numberOfPages, currentPage, searchTodo,
			showToast, toastMessage, toastAlertType, moveToCreatePage
		};
	}
}
</script>

<style scoped>
.todo {
	color: grey;
	text-decoration: line-through;
}
</style>
