<template>
  <div class="signup-page">
    <h1 class="title">Créer un compte</h1>
    <form class="signup-form" @submit.prevent="handleSignup">
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>

      <div class="form-group">
        <label for="name">Nom</label>
        <input
          id="lastName"
          v-model="lastName"
          class="input"
          placeholder="Entrez votre nom"
          type="text"
        />
      </div>

      <div class="form-group">
        <label for="name">prenom</label>
        <input
          id="name"
          v-model="name"
          class="input"
          placeholder="Entrez votre prenom"
          type="text"
        />
      </div>

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

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          id="password"
          v-model="password"
          class="input"
          minlength="4"
          placeholder="Entrez votre mot de passe"
          type="password"
        />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirmez le mot de passe</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          class="input"
          placeholder="Confirmez votre mot de passe"
          type="password"
        />
      </div>
      <button class="btn" type="submit">S'inscrire</button>
    </form>
    <p class="login-link">
      Vous avez déjà un compte ?
      <a href="/login">Connectez-vous <span class="highlight">ici</span>.</a>
    </p>
  </div>
</template>

<script lang="ts" setup>
import {type User} from '@/types/User';

const props = defineProps({
  userData: {
    type: Object as PropType<User>,
    required: true,
  },
});

const name = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const emit = defineEmits(['signupSuccess']);

const handleSignup = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  if (!name.value || !lastName.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Veuillez remplir tous les champs.';
    return;
  }
  if (!validMail(email.value)) {
    errorMessage.value = 'Adresse e-mail invalide.';
    return;
  }
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Les mots de passe ne correspondent pas.';
    return;
  }
  if (/\s/.test(password.value)) {
    errorMessage.value = 'Le mot de passe ne doit pas contenir d\'espaces.';
    return;
  }

  // Vérification de l'existence de l'e-mail
  try {
    const response = await fetch('/api/user/findByEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email.value}),
    });

    const data = await response.json();

    if (response.ok && data.exists) {
      errorMessage.value = data.message;
      return;
    } else if (!response.ok) {
      errorMessage.value = 'Erreur lors de la communication avec le serveur.';
      console.error('Erreur HTTP:', response.statusText);
      return;
    }

  } catch (error) {
    errorMessage.value = 'Erreur lors de la vérification de l’e-mail.';
    console.error(error);
    return;
  }
  successMessage.value = 'Compte créé avec succès !';

  props.userData.prenom = name.value;
  props.userData.nom = lastName.value;
  props.userData.mail = email.value;
  props.userData.password = password.value;

  setTimeout(() => {
    emit('signupSuccess');
  }, 500);
};
</script>


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
