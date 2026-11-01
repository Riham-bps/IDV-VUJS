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
    <input
      v-model="titleInput"
      placeholder="Ajouter la tâche"
      aria-label="Title of the new task"
    />
    <button type="submit">Ajouter task</button>
    <p v-if="messageError" role="alert">{{ messageError }}</p>
    <p v-else></p>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-wrap: wrap;
  background-color: var(--secondary);
  border: 1px solid var(--border);
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 10px;
}
input {
  flex: 1;
  min-width: 0;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--border);
  border-radius: 5px;
  color: var(--text);
}
input:focus {
  outline: none;
  border-color: var(--accent);
}
button {
  padding: 0.6rem 0.8rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: var(--primary-dark);
}
p {
  width: 100%;
  margin: 0;
  color: var(--red);
  font-size: 0.9rem;
}
</style>
