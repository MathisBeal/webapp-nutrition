import axios from 'axios';
import { ref } from 'vue';

export const isAuthenticated = ref(false);
export const userId = ref<string | null>(null);

export const setAuthenticationStatus = (status: boolean) => {
  isAuthenticated.value = status;
};

export const getSession = async () => {
  try {
    const response = await axios.get('/api/auth/session');
    if (response.data?.userId) {
      userId.value = response.data.userId;
      setAuthenticationStatus(true);
      console.log('ID utilisateur récupéré :', userId.value);
      return true;  // Utilisateur connecté
    } else {
      console.warn('Aucune session utilisateur trouvée.');
      userId.value = null;
      setAuthenticationStatus(false);
      return false;  // Aucun utilisateur connecté
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la session :', error);
    userId.value = null;
    setAuthenticationStatus(false);
    return false;  // Erreur de récupération de la session
  }
};

export const clearSession = () => {
  userId.value = null;
  setAuthenticationStatus(false);
};

export const logout = async () => {
  try {
    await axios.post('/api/auth/logout');
    clearSession();
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error);
  }
};
