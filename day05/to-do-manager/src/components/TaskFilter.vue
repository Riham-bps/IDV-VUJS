<script setup lang="ts">
import { ref } from 'vue';
import { Status } from '.././types/task.ts';

// déclare le nom de l'info que je vais envoyer App.vue
const emit = defineEmits(['filtre']);

// filtre des tasks en fonction du statut
const filtre = ref('all');
</script>

<template>
  <select v-model="filtre" @change="emit('filtre', filtre)">
    <option value="all">Tous</option>
    <option>{{ Status.ToDo }}</option>
    <option>{{ Status.InProgress }}</option>
    <option>{{ Status.Done }}</option>
  </select>
</template>

<style scoped></style>
