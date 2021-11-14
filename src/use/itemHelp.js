import { ref } from "vue";
import store from '../store/index';

export default function useTodos() {

    const newTodo = ref('');

    const addTodo = () => {
        const value = newTodo.value && newTodo.value.trim();
        if (!value) {
            return;
        }

        const payload = {
            title: value,
            done: false
        }

        store.dispatch('addToList', payload)
        newTodo.value = '';
    }


    return {
        addTodo,
        newTodo
    };
}