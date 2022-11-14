import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'

createApp(App).use(store).use(router).mount('#app')

/*
	json-server 실행 명령어
	npx json-server --watch db.json --port 3000
*/