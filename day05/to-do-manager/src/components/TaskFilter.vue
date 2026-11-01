<script setup lang="ts">
import { ref } from 'vue';
import { Status } from '.././types/task.ts';

// déclare le nom de l'info que je vais envoyer App.vue
const emit = defineEmits(['filtre']);

// filtre des tasks en fonction du statut
const filtre = ref('all');
</script>

<template>
  <div class="filter">
    <label for="status-filter">Filtrer par statut:</label>
    <select
      id="status-filter"
      v-model="filtre"
      @change="emit('filtre', filtre)"
      aria-label="Filter tasks by status"
    >
      <option value="all">Tous</option>
      <option>{{ Status.ToDo }}</option>
      <option>{{ Status.InProgress }}</option>
      <option>{{ Status.Done }}</option>
    </select>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
label {
  font-weight: bold;
  color: var(--text);
}
select {
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--border);
  border-radius: 5px;
  cursor: pointer;
  background-color: var(--white);
  color: var(--text);
}
</style>
