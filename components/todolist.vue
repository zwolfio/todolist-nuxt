<template>
  <div class="max-w-lg mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
    <TodoForm :todo="editTodoItem" :isEdit="isEditing" @submitted="fetchTodos" />
    
    <ul class="mt-6 space-y-3">
      <li 
        v-for="todo in todos" 
        :key="todo.id" 
        :class="{
          'bg-gray-300': todo.completed,
          'bg-white': !todo.completed,
        }"
        class="flex items-center justify-between p-4 rounded-lg shadow-sm"
      >
        <span :class="{ 'line-through text-gray-500': todo.completed }" class="text-lg font-medium">
          {{ todo.title }}
        </span>
        <div class="flex space-x-2">
          <button 
            @click="toggleCompleted(todo)" 
            class="text-white px-3 py-1 rounded-md hover:bg-blue-600"
            :class="{
              'bg-gray-500': todo.completed,
              'bg-green-400': !todo.completed,
            }"
          >
            Done
          </button>
          <button 
            @click="startEditing(todo)" 
            class="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
          >
            Edit
          </button>
          <button 
            @click="deleteTodo(todo.id)" 
            class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import TodoForm from '~/components/todoform.vue';

const todos = ref([]);
const isEditing = ref(false);
const editTodoItem = ref(null);

const fetchTodos = async () => {
  const response = await axios.get('http://localhost:3001/todos');
  todos.value = response.data;
};

const toggleCompleted = async (todo) => {
  await axios.put(`http://localhost:3001/todos/${todo.id}`, {
    ...todo,
    completed: !todo.completed
  });
  fetchTodos();
};

const startEditing = (todo) => {
  isEditing.value = true;
  editTodoItem.value = { ...todo };
};

const deleteTodo = async (id) => {
  await axios.delete(`http://localhost:3001/todos/${id}`);
  fetchTodos();
};

onMounted(fetchTodos);
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
