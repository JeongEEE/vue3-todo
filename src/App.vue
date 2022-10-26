<template>
  <div class="name">{{name}}</div>
  <div>{{greeting('JeongEEE')}}</div>
  <div>{{greet}}</div>
  <div>{{name}}</div>
	<button class="btn btn-primary" @click="updateName">Click</button>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
		const name = ref('JeongEEE');

		const greeting = (name) => {
			return 'Hello, ' + name
		};

		const greet = greeting(name.value);

		const updateName = () => {
			name.value = 'GyuJeong'
		}

		return {
			name, greeting, greet, updateName
		};
	}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.name {
	color: blue;
}
</style>
