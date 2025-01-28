<script lang="ts" setup>
// Importations nécessaires
import { ref } from 'vue'
import { useRouter } from 'nuxt/app'
import { setAuthenticationStatus } from '@/composables/useAuth'
import axios from 'axios'

// Variables et gestion de la logique
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleLogin = async () => {
  // Validation basique des champs
  if (!email.value || !password.value) {
    errorMessage.value = 'Veuillez remplir tous les champs.'
    return
  }

  try {
  // Appel API pour se connecter
  const response = await axios.post('/api/user/login', {
    email: email.value,
    password: password.value,
  });


  // Si connexion réussie
  if (response.data.success) {
    errorMessage.value = '';
    setAuthenticationStatus(true);
    router.push('/home');
  }
  } catch (error) {
    // Gestion des erreurs (par exemple, mauvais email/mot de passe ou erreur serveur)
    if (axios.isAxiosError(error) && error.response) {
      errorMessage.value = error.response.data.message || 'Une erreur est survenue.';
    } else {
      errorMessage.value = 'Erreur de connexion. Veuillez réessayer plus tard.';
    }
  }
}
</script>

<template>
  <div class="login-page">
    <h1 class="title">Connexion</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <!-- Message d'erreur général -->
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

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

