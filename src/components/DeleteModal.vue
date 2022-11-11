<template>
	<Modal>
		<template v-slot:title>
			Delete Todo
		</template>
		<template v-slot:body>
			todo를 삭제 하시겠습니까?
		</template>
		<template v-slot:footer>
			<button type="button" class="btn btn-secondary"
				@click="onClose">Close</button>
			<button type="button" class="btn btn-danger"
				@click="onDelete">Delete</button>
		</template>
	</Modal>
</template>

<script>
import Modal from '@/components/Modal.vue'
export default {
	components: {
		Modal
	},
	setup (props, { emit }) {
		function onClose() {
			emit('close')
		}

		function onDelete() {
			emit('delete')
		}

		return {
			onClose, onDelete
		}
	}
}
</script>

<style scoped>

</style>