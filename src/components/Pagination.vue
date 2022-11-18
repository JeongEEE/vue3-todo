<template>
	<nav aria-label="Page navigation example">
		<ul class="pagination">
			<li v-if="currentPage !== 1" class="page-item">
				<a class="page-link" @click="onClick(currentPage - 1)"
					style="cursor:pointer;">Previous</a>
			</li>
			<li class="page-item"
				v-for="page in numberOfPages" :key="page"
				:class="currentPage === page ? 'active' : ''">
				<a class="page-link" @click="onClick(page)"
					style="cursor:pointer;">{{page}}</a>
			</li>
			<li v-if="currentPage !== numberOfPages" class="page-item">
				<a class="page-link" @click="onClick(currentPage + 1)"
					style="cursor:pointer;">Next</a>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	props: {
		numberOfPages: {
			type: Number, required: true
		},
		currentPage: {
			type: Number, required: true
		}
	},
	emis: ['click'],
	setup (props, { emit }) {
		const onClick = (page) => {
			emit('click', page);
		}

		return {
			onClick
		}
	}
}
</script>

<style scoped>

</style>