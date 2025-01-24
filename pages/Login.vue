<script setup lang="ts">
import { ref } from 'vue'
import { setAuthenticationStatus } from '@/composables/useAuth'

const { fetch: refreshSession } = useUserSession()
const errorMessage = ref('')

const credentials = reactive({
  email: '',
  password: '',
})
async function login() {
  if (!credentials.email || !credentials.password) {
    errorMessage.value = 'Veuillez remplir tous les champs.'
    return
  }
  errorMessage.value = ''
  try {
    await $fetch('/api/login', { //envoie requete API a api/login
      method: 'POST',
      body: credentials,
    })

    await refreshSession() // Met à jour la session utilisateur
    await navigateTo('/home')
    setAuthenticationStatus(true)
  } catch (error: any) {
    if (error?.data?.message) {
      errorMessage.value = error.data.message
    } else {
      errorMessage.value = 'Une erreur est survenue.'
    }
  }
}
</script>

<template>
  <div class="login-page">
    <h1 class="title">Connexion</h1>
    <form @submit.prevent="login" class="login-form">

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <!-- Champ Email -->
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="credentials.email"
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
          v-model="credentials.password"
          placeholder="Entrez votre mot de passe"
          class="input"
        />
      </div>

      <button type="submit" class="btn">Se connecter</button>
    </form>

    <p class="signup-link">
      Vous n'avez pas encore de compte ?
      <a href="/Signup">Créez-en un <span class="highlight">ici</span>.</a>
    </p>
  </div>
</template>

<style scoped>
.login-page {
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
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-bottom: 15px;
  font-size: 14px;
}

.auth-status {
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  color: #007BFF;
}

.signup-link {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #333;
}

.signup-link a {
  color: #007BFF;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
}

.highlight {
  font-weight: bold;
}
</style>
