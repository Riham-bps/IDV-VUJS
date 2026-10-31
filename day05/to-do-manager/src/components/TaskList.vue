<script setup lang="ts">
import { type Task, Status } from '@/types/task';
import { ref } from 'vue';

// props tasks recus de App.vue
const props = defineProps<{ tasks: Task[] }>();
// emit va envoyer deux events à App.vue delete et edit
const emit = defineEmits(['delete', 'edit']);

// déclare le nom de l'info que je vais envoyer App.vue
const editedId = ref<string | null>(null);
const editedTitle = ref<string>('');
const messageError = ref<string>('');

// fonction pour modifier editedId et editedTitle à celles de task
function editingTitle(task: Task) {
  editedId.value = task.id;
  editedTitle.value = task.title;
  messageError.value = '';
}
function submitTitle(id: string) {
  if (editedTitle.value.trim() === '') {
    messageError.value = 'Erreur: la saisie est vide!';
  } else {
    // envoie evenement edit +id + title
    emit('edit', id, editedTitle.value.trim());
    editedId.value = null;
    messageError.value = '';
  }
}
</script>

<template>
  <ul>
    <li v-for="task in props.tasks" :key="task.id">
      {{ task.title }} - {{ task.status }} - {{ task.id }}

      <!-- Supprimer task -->
      <!-- envoie evenement delete +id  -->
      <button @click="emit('delete', task.id)" aria-label="Delete task">
        supprimer task
      </button>

      <!-- Modifier status -->
      <select v-model="task.status" aria-label="Select the task status">
        <option>{{ Status.ToDo }}</option>
        <option>{{ Status.InProgress }}</option>
        <option>{{ Status.Done }}</option>
      </select>

      <!-- Edit titre task soit formulaire de modification soit bouton modifier-->
      <form v-if="editedId === task.id" @submit.prevent="submitTitle(task.id)">
        <input
          v-model="editedTitle"
          placeholder="Nouveau titre"
          aria-label="Title of the new task"
        />
        <button type="submit">Valider</button>
        <p v-if="messageError" role="alert">{{ messageError }}</p>
      </form>
      <button v-else @click="editingTitle(task)">Modifier</button>
    </li>
  </ul>
</template>

<style scoped></style>
