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

// Fonction 1: ajouter task donnée reçue depuis @add TaskForm
function addTaskToList(title: string) {
  const task: Task = {
    // standard pour générer des valeurs d’ID uniques: integrée déja dans navig pas besoin de importer
    id: crypto.randomUUID(),
    title: title,
    status: Status.ToDo,
  };
  taskList.value.push(task);
}
// Fonction 2: supprimer task donnée reçue depuis @delete TaskList
function deleteTask(id: string) {
  taskList.value = taskList.value.filter(task => task.id !== id);
}
// Fonction 4: changement filtre - donnée reçue depuis @filtre TaskFilter
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

    <!-- Composant 2 - FilterTask - Filtre des tasks -->
    <TaskFilter @filtre="changeFiltre" />

    <!-- Composant 3 - TaskList - La liste des tasks selon status -->
    <TaskList :tasks="filtredTasks" @delete="deleteTask" @edit="editTask" />
  </main>

  <footer>Réalisée par bassim_r 2026</footer>
</template>

<style>
/* Style sur toute la page */
/* racine du projet, déclare toutes les variables de couleur */
/* https://www.realtimecolors.com/?colors=623307-f4e1d2-2f27ce-dedcff-433bff&fonts=Inter-Inter */
:root {
  --text: #623307; /* couleur du texte et boutons */
  --text-dark: #4a2605;
  --background: #f4e1d2; /* couleur de fond de la page */
  --primary: #2f27ce; /* couleur des boutons */
  --primary-dark: #241f9c; /* couleur survol boutons */
  --secondary: #dedcff; /* header */
  --accent: #433bff; /* champ actif */
  --white: #ffffff; /* couleur du texte sur les boutons */
  --border: #cbc8f5; /* couleur des bordures */
  --red: #a8322d; /* couleur des messages d'erreur */
}
* {
  box-sizing: border-box;
}
/* La page entiere */
body {
  margin: 0;
  font-family: 'Courier New', Courier, monospace;
  background-color: var(--background);
  color: var(--text);
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
button,
input,
select {
  font: inherit;
}
</style>
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
