
<script lang="ts" setup>
// Importation de Vue et de Nuxt composables
import { ref } from 'vue'
import { useRouter } from 'nuxt/app'

// Variables réactives pour les champs et messages
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const router = useRouter()

// Fonction de gestion de l'inscription
const handleSignup = async () => {
  // Réinitialiser les messages
  errorMessage.value = ''
  successMessage.value = ''

  // Vérifier les champs obligatoires
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Veuillez remplir tous les champs.'
    return
  }

  // Vérifier que les mots de passe correspondent
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Les mots de passe ne correspondent pas.'
    return
  }

  // Simuler une requête API pour l'inscription
  try {
    successMessage.value = 'Compte créé avec succès ! Redirection...'
    // Redirection vers la page de connexion après succès
    setTimeout(() => router.push('/login'), 1000)
  } catch (error) {
    errorMessage.value = "Une erreur s'est produite lors de l'inscription."
  }
}
</script>

<template>
  <div class="signup-page">
    <h1 class="title">Créer un compte</h1>
    <form @submit.prevent="handleSignup" class="signup-form">
      <!-- Message d'erreur ou succès -->
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>

      <!-- Champ Nom -->
      <div class="form-group">
        <label for="name">Nom</label>
        <input
          type="text"
          id="name"
          v-model="name"
          placeholder="Entrez votre nom"
          class="input"
        />
      </div>

      <!-- Champ Email -->
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Entrez votre email"
          class="input"
        />
      </div>

      <!-- Champ Mot de passe -->
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Entrez votre mot de passe"
          class="input"
        />
      </div>

      <!-- Champ Confirmation du mot de passe -->
      <div class="form-group">
        <label for="confirmPassword">Confirmez le mot de passe</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          placeholder="Confirmez votre mot de passe"
          class="input"
        />
      </div>

      <!-- Bouton de soumission -->
      <button type="submit" class="btn">S'inscrire</button>
    </form>

    <!-- Lien vers la page de connexion -->
    <p class="login-link">
      Vous avez déjà un compte ?
      <a href="/login">Connectez-vous <span class="highlight">ici</span>.</a>
    </p>
  </div>
</template>

<style scoped>
.signup-page {
  max-width: 400px;
  margin: 50px auto;
  padding: 25px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  background-color: #fff;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.input {
  width: 95%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #218838;
}

.error {
  color: red;
  margin-bottom: 15px;
  font-size: 14px;
}

.success {
  color: green;
  margin-bottom: 15px;
  font-size: 14px;
}

.login-link {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #333;
}

.login-link a {
  color: #007BFF;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

.highlight {
  font-weight: bold;
}
</style>
