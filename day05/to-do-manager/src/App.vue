<script setup lang="ts">
import { type Task, Status } from './types/task.ts';
import { computed, ref, watch } from 'vue';
import TaskForm from './components/TaskForm.vue';
import TaskFilter from './components/TaskFilter.vue';
import TaskList from './components/TaskList.vue';

// Local Storage
const saveTasks = localStorage.getItem('tasks');
// La liste des tasks doit rester dans App.vue
// JSON.parse: transformer json en tableau
const taskList = ref<Task[]>(saveTasks ? JSON.parse(saveTasks) : []);
// watch(ce que je surveille, (ma nouvelle valeur)
watch(
  taskList,
  newList => {
    localStorage.setItem('tasks', JSON.stringify(newList));
  },
  // deep: surveiller meme les modification: status etc
  { deep: true }
);

// Fonction 1: ajouter task donnée reçue depuis event @add TaskForm
function addTaskToList(title: string) {
  const task: Task = {
    // standard pour générer des valeurs d’ID uniques: integrée déja dans navig pas besoin de importer
    id: crypto.randomUUID(),
    title: title,
    status: Status.ToDo,
  };
  taskList.value.push(task);
}
// Fonction 2: supprimer task donnée reçue depuis event @delete TaskList
function deleteTask(id: string) {
  taskList.value = taskList.value.filter(task => task.id !== id);
}
// Fonction 4: changement filtre - donnée reçue depuis event @filtre TaskFilter
function changeFiltre(value: string) {
  filtre.value = value;
}
// Fonction 5: la liste des tasks selon filtre
const filtre = ref('all');
const filtredTasks = computed(() => {
  if (filtre.value === 'all') {
    return taskList.value;
  }
  return taskList.value.filter(task => task.status === filtre.value);
});

// Fonction 6: Modifier titre de la tache
function editTask(id: string, title: string) {
  const task = taskList.value.find(task => task.id === id);
  if (task) {
    task.title = title;
  }
}
</script>

<template>
  <header>
    <h1>To-Do Manager Project</h1>
  </header>

  <main>
    <!-- Composant 1 - TaskForm: Ajouter task -->
    <TaskForm @add="addTaskToList" />

    <!-- Composant 2 - TaskFilter - Filtrer les tasks -->
    <TaskFilter @filtre="changeFiltre" />

    <!-- Composant 3 - TaskList - Afficher la liste des tasks selon status choisi -->
    <TaskList :tasks="filtredTasks" @delete="deleteTask" @edit="editTask" />
  </main>

  <footer>Réalisée par bassim_r 2026</footer>
</template>

<style scoped>
header {
  background-color: var(--secondary);
  text-align: center;
  padding: 1.5rem 1.5rem;
}
h1 {
  margin: 0;
  font-size: 1.6rem;
}
main {
  flex: 1;
  width: 100%;
  max-width: 640px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
footer {
  color: var(--text);
  text-align: center;
  padding: 1.5rem;
  font-size: 0.9rem;
}
</style>
