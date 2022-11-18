<template>
	<Navbar />
	<div class="container">
		<router-view />
	</div>
	<Toast />
</template>

<script>
/*
	json-server 실행 명령어
	npx json-server --watch db.json --port 3000
*/
import { onBeforeMount, onMounted, onBeforeUpdate,
	onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
	import Navbar from '@/components/Navbar.vue'
import Toast from '@/components/Toast.vue'
export default {
	components: {
		Navbar, Toast
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
