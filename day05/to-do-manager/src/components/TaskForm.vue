<script setup lang="ts">
import { ref } from 'vue';

// déclare le nom de l'info que je vais envoyer App.vue
const emit = defineEmits(['add']);

const titleInput = ref<string>('');
function submit() {
  if (titleInput.value.trim() === '') {
    // trim pour enlever tous les espaces
    alert('Erreur: la saisie est vide!');
  } else {
    // envoie evenement add + title
    emit('add', titleInput.value.trim());
    // initialise après saisie de task
    titleInput.value = '';
  }
}
</script>

<template>
  <input v-model="titleInput" placeholder="Ajouter la tâche" />
  <button @click="submit">Ajouter task</button>
</template>

<style scoped></style>
