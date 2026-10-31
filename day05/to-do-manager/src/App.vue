<script setup lang="ts">
import { type Task, Status } from './types/task.ts';
import { computed, ref } from 'vue';
import TaskForm from './components/TaskForm.vue';
import TaskFilter from './components/TaskFilter.vue';

// La liste des tasks doit rester dans App.vue
const taskList = ref<Task[]>([
  { id: 1, title: 'task1', status: Status.ToDo },
  { id: 2, title: 'task2', status: Status.ToDo },
  { id: 3, title: 'task3', status: Status.ToDo },
]);

// ajouter task
function addTaskToList(title: string) {
  const task: Task = {
    // standard pour générer des valeurs d’ID uniques: integrée déja dans navig pas besoin de importer
    id: crypto.randomUUID(),
    title: title,
    status: Status.ToDo,
  };
  taskList.value.push(task);
}

//supprimer task
function deleteTask(id: number | string) {
  taskList.value = taskList.value.filter(task => task.id !== id);
}

// filtre des tasks en fonction du statut
function changeFiltre(value: string) {
  filtre.value = value;
}
const filtre = ref('all');
const filtredTasks = computed(() => {
  if (filtre.value === 'all') {
    return taskList.value;
  }
  return taskList.value.filter(task => task.status === filtre.value);
});
</script>

<template>
  <header>
    <h1>To-Do Manager Project</h1>
  </header>

  <main>
    <!-- mes components: TaskForm, TaskFilter, TaskList -->

    <!-- Composant 1: TaskForm: Ajouter task -->
    <TaskForm @add="addTaskToList" />

    <!-- Composant 2: Filtre des tasks -->
    <TaskFilter @filtre="changeFiltre" />

    <!-- Composant 3: La liste des tasks selon status -->
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
