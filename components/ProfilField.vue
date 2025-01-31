<template>
  <div class="profil-field">
    <label v-if="field.type !== 'hidden'" :for="field.name">{{ field.name }}</label>

    <div v-if="!field.options">
      <!--Input-->
      <input
        :name="field.name"
        :type="field.type"
        v-model="field.value"
        :disabled="field.name === 'IMC'"
        required
      />
    </div>

    <div v-else>
      <!--Select unique-->
      <select v-if="field.type != 'select'"
        :name="field.name"
        placeholder="Choisissez une option"
        v-model="field.value">

        <option v-for="option in field.options"
          :key="option.value"
          :value="option.value">
          {{ option.text }}
        </option>

      </select>

      <!--Select multiple-->
      <!--
        Label = valeur de l'option à afficher
        Track-by = valeur de l'option à sauvegarder

      -->
      <Multiselect v-else
        class="multiselect"
        placeholder="Choisissez une ou plusieurs option(s)"
        :name="field.name"
        label="text"
        :track-by="'value'"
        :options="field.options"
        :multiple="true"
        v-model="field.value">

      </Multiselect>
    </div>

    <span v-if="bError" class="error-icon">❌</span>

  </div>
</template>

<script lang="ts" setup>
import Multiselect from 'vue-multiselect'
import { type Field } from '@/types/Profil';
import { validMail, validWeight, validHeight, validAge } from '@/utils/validProfilData';

const props = defineProps({
  field: {
    type: Object as PropType<Field>,
    required: true
  }
});

const emit = defineEmits(['updateField']);

const bError = ref(false);

const checkVal = (val: any, verif: (arg0: any) => boolean): boolean => {
  const bool = verif(val);
  bError.value = !bool;
  return bool;
}

watch(() => props.field.value, (newValue) => {
  if (props.field.name === "") { console.log(props.field.value); }

  // Refuse empty values
  if (newValue === '' || newValue === null || newValue === undefined) {
    bError.value = true;
    return;
  }

  // Check if the value is valid
  switch (props.field.name) {
    case 'Email':
      if (!checkVal(newValue, validMail)) { return; }
      break;

    case 'Poids':
      if (!checkVal(newValue, validWeight)) { return; }
      break;

    case 'Taille':
      if (!checkVal(newValue, validHeight)) { return; }
      break;

    case 'Âge':
      if (!checkVal(newValue, validAge)) { return; }
      break;
  }

  bError.value = false;
  emit('updateField',{ name: props.field.name, val: props.field.value});
});
</script>

<style>

</style>
