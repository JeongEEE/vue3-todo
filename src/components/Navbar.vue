<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<router-link class="navbar-brand" to="/">Vue3-Todo</router-link>

		<ul class="navbar-nav mr-auto">
			<li class="nav-item active">
				<router-link class="nav-link" to="/todos">Todos <span class="sr-only">(current)</span></router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	setup () {
		

		return {}
	}
}
</script>

<style scoped>

</style>