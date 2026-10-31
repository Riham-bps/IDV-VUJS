<script setup lang="ts">
import { type Task, Status } from '@/types/task';

// props tasks recus de App.vue
const props = defineProps<{ tasks: Task[] }>();
// info que je vais envoyer a App
const emit = defineEmits(['delete']);
</script>

<template>
  <ul>
    <li v-for="task in props.tasks" :key="task.id">
      {{ task.title }} - {{ task.status }} - {{ task.id }}

      <!-- Supprimer task -->
      <button @click="emit('delete', task.id)">supprimer task</button>

      <!-- Modifier status -->
      <select v-model="task.status">
        <option>{{ Status.ToDo }}</option>
        <option>{{ Status.InProgress }}</option>
        <option>{{ Status.Done }}</option>
      </select>

      <!-- Edit titre task -->
      <input v-model="task.title" placeholder="Modifier la tâche" />
    </li>
  </ul>
</template>

<style scoped></style>
