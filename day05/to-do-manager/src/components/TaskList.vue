<script setup lang="ts">
import { type Task, Status } from '@/types/task';
import { ref } from 'vue';

// props tasks recus depuis App.vue
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
    <li v-for="task in props.tasks" :key="task.id" :data-status="task.status">
      <!-- Afficher le titre de la tache ou formulaire de modification -->
      <form v-if="editedId === task.id" @submit.prevent="submitTitle(task.id)">
        <input
          v-model="editedTitle"
          placeholder="Nouveau titre"
          aria-label="Title of the new task"
        />
        <button type="submit">Valider</button>
        <p v-if="messageError" role="alert">{{ messageError }}</p>
      </form>
      <span v-else class="task-title">{{ task.title }}</span>

      <div class="status">
        <!-- Modifier status -->
        <select v-model="task.status" aria-label="Select the task status">
          <option>{{ Status.ToDo }}</option>
          <option>{{ Status.InProgress }}</option>
          <option>{{ Status.Done }}</option>
        </select>
        <!-- Bouton Modifier task -->
        <button
          v-if="editedId !== task.id"
          @click="editingTitle(task)"
          aria-label="Edit task title"
        >
          Modifier
        </button>
        <!-- Bouton Supprimer task: envoie evenement delete +id -->
        <button @click="emit('delete', task.id)" aria-label="Delete task">
          Supprimer
        </button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
ul {
  /* NE PAS AFFICHER les tirets points de la liste */
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
li {
  display: flex;
  flex-direction: column;
  background-color: var(--secondary);
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  align-items: center;
  gap: 0.75rem;
  border-radius: 10px;
  border-left: 5px solid var(--primary);
}
li[data-status='to do'] {
  border-left-color: var(--primary);
}
li[data-status='in progress'] {
  border-left-color: orange;
}
li[data-status='done'] {
  border-left-color: green;
}
.task-title {
  font-weight: bold;
  overflow-wrap: anywhere;
}
.status {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
input,
select {
  background-color: var(--white);
  color: var(--text);
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--border);
  border-radius: 5px;
}
input {
  flex: 1;
  min-width: 0;
}
button {
  padding: 0.6rem 0.8rem;
  background-color: var(--text);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type='submit'] {
  background-color: var(--primary);
}
button[type='submit']:hover {
  background-color: var(--primary-dark);
}

button[aria-label='Delete task'] {
  margin-left: auto;
  background: transparent;
  color: var(--red);
  border: 1px solid var(--red);
}
button[aria-label='Delete task']:hover {
  background-color: var(--red);
  color: var(--white);
}

p {
  width: 100%;
  margin: 0;
  color: var(--red);
  font-size: 0.9rem;
}
</style>
