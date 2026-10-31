<script setup lang="ts">
import { ref } from 'vue';

// déclare le nom de l'info que je vais envoyer App.vue
const emit = defineEmits(['add']);
const messageError = ref<string>('');
const titleInput = ref<string>('');
function submit() {
  // trim pour enlever tous les espaces
  if (titleInput.value.trim() === '') {
    messageError.value = 'Erreur: la saisie est vide!';
  } else {
    // envoie evenement add + title
    emit('add', titleInput.value.trim());
    // initialise après saisie de task
    titleInput.value = '';
    // effacer le message d'erreur
    messageError.value = '';
  }
}
</script>

<template>
  <!-- prevent: empêcher de recharger la page après submit -->
  <form @submit.prevent="submit">
    <input v-model="titleInput" placeholder="Ajouter la tâche" />
    <button type="submit">Ajouter task</button>
    <p v-if="messageError">{{ messageError }}</p>
    <p v-else></p>
  </form>
</template>

<style scoped></style>
