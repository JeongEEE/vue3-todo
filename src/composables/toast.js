/*
	composition API 사용법
*/

import { ref } from 'vue';
export const useToast = () => {
	const showToast = ref(false);
	const toastMessage = ref('');
	const toastAlertType = ref('');
	const toastTimeout = ref(null);

	const triggerToast = (message, type = 'success') => {
		showToast.value = true;
		toastAlertType.value = type;
		toastMessage.value = message;
		toastTimeout.value = setTimeout(() => {
			showToast.value = false;
			toastMessage.value = '';
			toastAlertType.value = '';
		}, 2000);
	}
	return {
		showToast, toastMessage, toastAlertType, triggerToast
	}
}