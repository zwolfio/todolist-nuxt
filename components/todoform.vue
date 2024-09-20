<template>
  <form @submit.prevent="submitForm" class="flex space-x-2">
    <input 
      v-model="todo.title" 
      placeholder="Add a new todo" 
      required 
      class="border rounded p-2 w-full"
    />
    <button type="submit" class="bg-blue-500 text-white px-3 py-1 rounded-md">
      {{ isEdit ? 'Update' : 'Add' }}
    </button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
  todo: Object,
  isEdit: Boolean
});

const emit = defineEmits(['submitted']);

const todo = ref(props.todo || { title: '', completed: false });

// Watch for changes to props.todo
watch(() => props.todo, (newTodo) => {
  todo.value = newTodo ? { ...newTodo } : { title: '', completed: false };
});

const submitForm = async () => {
  if (props.isEdit) {
    await axios.put(`http://localhost:3001/todos/${todo.value.id}`, todo.value);
  } else {
    await axios.post('http://localhost:3001/todos', todo.value);
  }
  emit('submitted');
};
</script>
