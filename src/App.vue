<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<router-link class="navbar-brand" to="/">Vue3-Todo</router-link>

		<ul class="navbar-nav mr-auto">
			<li class="nav-item active">
				<router-link class="nav-link" to="/todos">Todos <span class="sr-only">(current)</span></router-link>
			</li>
		</ul>
	</nav>

	<div class="container">
		<router-view />
	</div>
</template>

<script>
/*
	json-server 실행 명령어
	npx json-server --watch db.json --port 3000
*/
import { onBeforeMount, onMounted, onBeforeUpdate,
	onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
export default {
	components: {
		
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
