<script setup lang="ts">
import { type Task, Status } from './types/task.ts';
import { computed, ref } from 'vue';

// La liste des tasks doit rester dans App.vue
const taskList = ref<Task[]>([
  { id: 1, title: 'task1', status: Status.ToDo },
  { id: 2, title: 'task2', status: Status.ToDo },
  { id: 3, title: 'task3', status: Status.ToDo },
]);

// ajouter task
const titleInput = ref<string>('');
function addTaskToList() {
  if (titleInput.value.trim() === '') {
    // trim pour enlever tous les espaces
    alert('Erreur: la saisie est vide!');
  } else {
    const task: Task = {
      // standard pour générer des valeurs d’ID uniques: integrée déja dans navig pas besoin de importer
      id: crypto.randomUUID(),
      title: titleInput.value,
      status: Status.ToDo,
    };
    taskList.value.push(task);
    // initialise après saisie de task
    titleInput.value = '';
  }
}

//supprimer task
function deleteTask(id: number | string) {
  taskList.value = taskList.value.filter(task => task.id !== id);
}

// filtre des tasks en fonction du statut
const filtre = ref('all');
const filtredTasks = computed(() => {
  if (filtre.value === 'all') {
    return taskList.value;
  }
  return taskList.value.filter(task => task.status === filtre.value);
});

// console navigateur
// console.log(task1.title)
// console.log(task2.title)
// console.log(task3.title)
</script>

<template>
  <header>
    <h1>To-Do Manager Project</h1>
  </header>

  <main>
    <!-- mes components: TaskForm, TaskFilter, TaskList -->

    <!-- Ajouter task -->
    <input v-model="titleInput" placeholder="Ajouter la tâche" />
    <button @click="addTaskToList">Ajouter task</button>

    <!-- La liste des tasks -->
    <h2>filtre</h2>

    <select v-model="filtre">
      <option value="all">Tous</option>
      <option>{{ Status.ToDo }}</option>
      <option>{{ Status.InProgress }}</option>
      <option>{{ Status.Done }}</option>
    </select>

    <ul>
      <li v-for="task in filtredTasks" :key="task.id">
        {{ task.title }} - {{ task.status }} - {{ task.id }}

        <!-- Supprimer task -->
        <button @click="deleteTask(task.id)">supprimer task</button>

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
  </main>

  <footer>Réalisée par bassim_r 2026</footer>
</template>

<style scoped></style>
