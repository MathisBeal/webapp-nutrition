<template>
  <div>
    <h1>Profil</h1>
    <form @submit.prevent="updateProfile">

      <ProfilField
        v-for="field in fields"
        :key="field.name"
        :field="field"
        @updateField="updateField"
      />

      <button type="submit">Mettre à jour le profil</button>
    </form>
    <NuxtNotifications
    position="top center"
    :speed="500"/>
  </div>
</template>

<script lang="ts" setup>
import { type Field, type Option } from '@/types/Profil';
import { type Users } from '@prisma/client';
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();


/* ------------ Functions --------------*/

const field = (name: string, value: string | number, type: string, options?: Option[]): Field => {
  return {
    name,
    value,
    type,
    options,
  }
}

const enableConfirmField = () => {
  const confirm_field = fields.value.find(f => f.name === 'Confirmer le mot de passe');
  if (!confirm_field) { return; }

  // Enable confirm password field
  confirm_field.type = 'password';
};

const verifyPassword = (): boolean => {
  const password_field = fields.value.find(f => f.name === 'Mot de Passe');
  if (!password_field) { return false; }

  // Show error message if password contains whitespace
  if (/\s/.test(<string>password_field.value)) {
    notify({
      type: 'error',
      title: 'Erreur',
      text: 'Le mot de passe ne doit pas contenir d\'espace.'
    });
    return false;
  }

  const confirm_field = fields.value.find(f => f.name === 'Confirmer le mot de passe');
  if (!confirm_field) { return false; }

  // Show error message if passwords don't match
  if (confirm_field.value !== password_field.value) {
    notify({
      type: 'error',
      title: 'Erreur',
      text: 'Les mots de passe ne correspondent pas.'
    });
    return false;
  }

  return true;
};

/* ------------ Variables --------------*/

const profil: Users = null; //Get user (pas besoin d'etre un ref)

// const fields = ref<Field[]>([
//   field('Nom', profil.nom, 'text'),
//   field('Prénom', profil.prenom, 'text'),
//   field('Email', profil.mail, 'email'),
//   field('Poids', profil.poids.toString(), 'number'),
//   field('Taille', profil.taille.toString(), 'number'),
//   field('IMC', profil.imc.toString(), 'number'), //Trouver comment l'update sans la db
//   field('Régime Alimentaire', profil.regimeAlimentaire.toString(), 'select', [
//     { value: '1', text: 'Général' },
//     { value: '2', text: 'Végétarisme' },
//     { value: '3', text: 'Véganisme' }
//   ]),
//   field('Genre', profil.sexe, 'select', [
//     { value: 'homme', text: 'Homme' },
//     { value: 'femme', text: 'Femme' },
//     { value: 'autres', text: 'Autres' }
//   ]),
//   field('Âge', profil.age.toString(), 'number'),
//   field('Mot de Passe', '', 'password'),
// ]);

const fields = ref<Field[]>([
  field('Nom', 'Doe', 'text'),
  field('Prénom', 'John', 'text'),
  field('Email', 'john.doe@example.com', 'email'),
  field('Poids', 70, 'number'),
  field('Taille', 175, 'number'),
  field('IMC', 22.9, 'number'), //Trouver comment l'update sans la db
  field('Régime Alimentaire', 2, 'select',[
    { value: '1', text: 'Général' },
    { value: '2', text: 'Végétarisme' },
    { value: '3', text: 'Véganisme' }
  ]),
  field('Genre', 'homme', 'select', [
    { value: 'homme', text: 'Homme' },
    { value: 'femme', text: 'Femme' },
    { value: 'autres', text: 'Autres' }
  ]),
  field('Âge', 30, 'number'),
  field('Mot de Passe', 'password123', 'password'),
  field('Confirmer le mot de passe', '', 'hidden'),
]);


/* ------------ Reactives functions --------------*/

// Reception de l'emit et transfert de la nouvelle valeur dans le tableau
const updateField = ({ name, val }: { name: string, val: string}) => {
  const fieldToUpdate = fields.value.find(f => f.name === name);
  if (!fieldToUpdate) { return; }

  if (name === 'Mot de Passe') { enableConfirmField(); }

  // Update field value
  fieldToUpdate.value = val;
};


const updateProfile = () => {
  // Verify password
  if (!verifyPassword()) { return;}

  // Reset confirm field
  const confirm_field = fields.value.find(f => f.name === 'Confirmer le mot de passe');
  if (confirm_field) {
    confirm_field.type = 'hidden';
  }

  console.log('Profile updated');
};
</script>

<style scoped>
div {
  margin-bottom: 10px;
  margin-left: 20vw;
}
</style>
