<template>
  <div class="login-page">
    <h1 class="title">Connexion</h1>
    <form class="login-form" @submit.prevent="handleLogin">
      <!-- Champ Email -->
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          class="input"
          placeholder="Entrez votre email"
          type="email"
        />
      </div>

      <!-- Champ Mot de passe -->
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          id="password"
          v-model="password"
          class="input"
          placeholder="Entrez votre mot de passe"
          type="password"
        />
      </div>

      <button class="btn" type="submit">Se connecter</button>
    </form>

    <p class="signup-link">
      Vous n'avez pas encore de compte ?
      <a href="/Signup">Créez-en un <span class="highlight">ici</span>.</a>
    </p>
    <NuxtNotifications class="custom-notif"
    position="top center"
    :speed="500"/>
  </div>
</template>

<script lang="ts" setup>
import {useRouter} from 'nuxt/app'
import {setAuthenticationStatus} from '@/composables/useAuth'
import { NuxtNotifications } from '#components';

// Variables et gestion de la logique
const { notify } = useNotification();
const email = ref('')
const password = ref('')
const router = useRouter()

interface ApiResponse {
  success: boolean;
  message?: string;
}

const validateFields = (): boolean => {
  if (!email.value || !password.value) {
    notify({
      type: 'error',
      title: 'Erreur',
      text: 'Veuillez remplir tous les champs.'
    });
    return false;
  }
  return true;
};

const loginUser = async (): Promise<Response> => {
  const response = await fetch('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });

  return response;
};

const handleResponse = (data: ApiResponse, response: Response): boolean => {
  if (response.status === 400 && data.message) {
    notify({
      type: 'error',
      title: 'Erreur',
      text: data.message
    });
    return false;
  }

  if (data.success) {
    setAuthenticationStatus(true);
    router.push('/');
    return true;
  } else {
    notify({
      type: 'error',
      title: 'Erreur',
      text: 'Email ou mot de passe incorrect.'
    });
    return false;
  }
};

const handleLogin = async () => {
  if (!validateFields()) return;

  try {
    const response = await loginUser();
    const data: ApiResponse = await response.json();
    handleResponse(data, response);
  } catch (error) {
    notify({
      type: 'error',
      title: 'Erreur',
      text: 'Erreur lors de la connexion. Veuillez réessayer.'
    });
  }
};
</script>

<style scoped>
.login-page {
  max-width: 90vw;
  width: 25%;
  margin: 20vh;
  margin-left: 40vw;
  padding: 2em;
  border: 0.1vh solid #ccc;
  border-radius: 0.5em;
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  background-color: #fff;
}

.title {
  text-align: center;
  margin-bottom: 2em;
  font-size: 2.5em;
  color: #333;
}

.form-group {
  margin-bottom: 2em;
}

label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
}

.input {
  width: 95%;
  padding: 1em;
  font-size: 1em;
  border: 0.1vh solid #ccc;
  border-radius: 0.25em;
}

.btn {
  width: 100%;
  padding: 1em;
  font-size: 1em;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 0.25em;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-bottom: 1.5em;
  font-size: 1em;
}

.signup-link {
  margin-top: 2em;
  text-align: center;
  font-size: 1em;
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
