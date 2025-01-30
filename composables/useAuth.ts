export const isAuthenticated = ref(false);
export const userId = ref<string | null>(null);

export const setAuthenticationStatus = (status: boolean) => {
  isAuthenticated.value = status;
};

export const getSession = async () => {
  try {
    const response = await fetch('/api/auth/session');
    const data = await response.json();
    if (data?.userId) {
      userId.value = data.userId;
      setAuthenticationStatus(true);
      console.log('ID utilisateur récupéré :', userId.value);
      return true;  // connecté
    } else {
      console.warn('Aucune session utilisateur trouvée.');
      userId.value = null;
      setAuthenticationStatus(false);
      return false;  // non connecté
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la session :', error);
    userId.value = null;
    setAuthenticationStatus(false);
    return false;  // Erreur de récupération de la session
  }
};

export const logout = async () => {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
    userId.value = null;
    setAuthenticationStatus(false);
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error);
  }
};
