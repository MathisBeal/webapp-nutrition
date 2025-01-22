import { ref } from 'vue'

// Variable réactive partagée
export const isAuthenticated = ref(false)

// Fonction pour modifier la valeur de `isAuthenticated`
export const setAuthenticationStatus = (status: boolean) => {
  isAuthenticated.value = status
}
