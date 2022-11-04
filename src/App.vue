<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<router-link class="navbar-brand" to="/">Vue3-Todo</router-link>

		<ul class="navbar-nav mr-auto">
			<li class="nav-item active">
				<router-link class="nav-link" to="/todos">Todos <span class="sr-only">(current)</span></router-link>
			</li>
		</ul>
	</nav>

	<router-view />
</template>

<script>
export default {
	components: {
		
	},
  setup() {
		
		return {
			
		};
	}
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
