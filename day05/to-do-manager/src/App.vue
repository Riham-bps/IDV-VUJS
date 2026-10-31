<script setup lang="ts">
import { type Task, Status } from './types/task.ts';
import { computed, ref } from 'vue';
import TaskForm from './components/TaskForm.vue';
import TaskFilter from './components/TaskFilter.vue';
import TaskList from './components/TaskList.vue';

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

    <!-- Composant 1 - TaskForm: Ajouter task -->
    <TaskForm @add="addTaskToList" />

    <!-- Composant 2 - FilterTask - Filtre des tasks -->
    <TaskFilter @filtre="changeFiltre" />

    <!-- Composant 3 - TaskList - La liste des tasks selon status -->
    <TaskList :tasks="filtredTasks" @delete="deleteTask" />
  </main>

  <footer>Réalisée par bassim_r 2026</footer>
</template>

<style scoped></style>
