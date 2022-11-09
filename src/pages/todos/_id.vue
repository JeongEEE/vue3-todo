<template>
	<h1>To-do Page</h1>
	<div v-if="loading">Loading...</div>
	<form v-else @submit.prevent="onSave">
		<div class="row">
			<div class="col-6">
				<div class="form-group">
					<label>Todo Subject</label>
					<input v-model="todo.subject" type="text" class="form-control">
				</div>
			</div>
			<div class="col-6">
				<div class="form-group">
					<label>Status</label>
					<div>
						<button class="btn" type="button"
							:class="todo.completed ? 'btn-success' : 'btn-danger'"
							@click="toggleTodoStatus">
							{{ todo.completed ? 'Completed' : 'Incomplete' }}
						</button>
					</div>
				</div>
			</div>
		</div>
		
		<button type="submit" class="btn btn-primary"
			:disabled="!todoUpdated">저장</button>
		<button class="btn btn-outline-dark ml-2"
			@click="moveToTodoListPage">Cancel</button>
	</form>
	<Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ref, computed, onBeforeMount, onMounted, onBeforeUpdate,
	onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast'
export default {
	components: {
		Toast
	},
	setup() {
		onBeforeMount(() => {
			// DOM 생성 전
		})
		onMounted(() => {
			// DOM 생성 후
		})
		onBeforeUpdate(() => {
			// state가 업데이트 되기전
		});
		onUpdated(() => {
			// state가 업데이트 된 후
		});
		onBeforeUnmount(() => {
			// 컴포넌트가 소멸되기전
		});
		onUnmounted(() => {
			// 컴포넌트가 소멸된 후
		});

		const route = useRoute();
		const router = useRouter();
		const todo = ref(null);
		const originalTodo = ref(null);
		const loading = ref(true);
		const todoId = route.params.id;
		const { showToast, toastMessage, toastAlertType, triggerToast } = useToast();

		console.log(route.params.id);
		async function getTodo() {
			try {
				const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
				todo.value = { ...res.data }; // 같은 메모리를 참조하므로 새로운 객체로 만들기
				originalTodo.value = { ...res.data };
				loading.value = false;
			} catch(err) {
				triggerToast('Something went wrong', 'danger')
			}
		}
		getTodo();

		const todoUpdated = computed(() => {
			return !_.isEqual(todo.value, originalTodo.value);
		})

		function toggleTodoStatus() {
			todo.value.completed = !todo.value.completed;
		}

		function moveToTodoListPage() {
			router.push({
				name: 'Todos'
			})
		}

		async function onSave() {
			try {
				const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
					subject: todo.value.subject,
					completed: todo.value.completed
				});
				originalTodo.value = { ...res.data };
				triggerToast('Successfully saved!');
			} catch(err) {
				triggerToast('Something went wrong', 'danger')
			}
		}

		return {
			todo, loading, toggleTodoStatus, moveToTodoListPage, onSave,
			todoUpdated, showToast, toastMessage, toastAlertType
		}
	}
}
</script>

<style scoped>

</style>