<template>
	<div v-if="loading">Loading...</div>
	<form v-else @submit.prevent="onSave">
		<div class="row">
			<div class="col-6">
				<!-- <div class="form-group">
					<label>Todo Subject</label>
					<input v-model="todo.subject" type="text" class="form-control">
					<div v-if="subjectError" style="color:red;">{{subjectError}}</div>
				</div> -->
				<Input label="Subject" v-model:subject="todo.subject"
					:error="subjectError" />
			</div>
			<div v-if="editing" class="col-6">
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
			<div class="col-12">
				<div class="form-group">
					<label>Body</label>
					<textarea v-model="todo.body" class="form-control"></textarea>
				</div>
			</div>
		</div>
		
		<button type="submit" class="btn btn-primary"
			:disabled="!todoUpdated">{{ editing ? '수정' : '생성'}}</button>
		<button class="btn btn-outline-dark ml-2"
			@click="moveToTodoListPage">Cancel</button>
	</form>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from '@/axios';
import { ref, computed, onBeforeMount, onMounted, onBeforeUpdate,
	onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
import _ from 'lodash';
import { useToast } from '@/composables/toast'
import Input from '@/components/Input.vue'
export default {
	components: {
		Input
	},
	props: {
		editing: {
			type: Boolean, default: false
		}
	},
	setup(props) {
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
		const todo = ref({
			subject: '', completed: false, body: ''
		});
		const subjectError = ref('')
		const originalTodo = ref(null);
		const loading = ref(false);
		const todoId = route.params.id;
		const { showToast, toastMessage, toastAlertType, triggerToast } = useToast();

		console.log(route.params.id);
		async function getTodo() {
			loading.value = true;
			try {
				const res = await axios.get(`todos/${todoId}`);
				todo.value = { ...res.data }; // 같은 메모리를 참조하므로 새로운 객체로 만들기
				originalTodo.value = { ...res.data };
				loading.value = false;
			} catch(err) {
				loading.value = false;
				triggerToast('Something went wrong', 'danger')
			}
		}
		if(props.editing) {
			getTodo();
		}

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
			if(!todo.value.subject) {
				subjectError.value = 'Subject is required';
				return;
			}
			try {
				let res;
				const data = {
					subject: todo.value.subject,
					completed: todo.value.completed,
					body: todo.value.body
				}
				if(props.editing) {
					res = await axios.put(`todos/${todoId}`, data);
					originalTodo.value = { ...res.data };
				} else {
					res = await axios.post(`todos`, data);
					todo.value.subject = '';
					todo.value.body = '';
				}
				
				triggerToast('Successfully saved!');
				if(!props.editing) {
					router.push({name: 'Todos'})
				}
			} catch(err) {
				triggerToast('Something went wrong', 'danger')
			}
		}

		return {
			todo, loading, toggleTodoStatus, moveToTodoListPage, onSave,
			todoUpdated, showToast, toastMessage, toastAlertType, subjectError,
		}
	}
}
</script>

<style scoped>

</style>