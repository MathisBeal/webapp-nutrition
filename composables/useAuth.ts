export const isAuthenticated = ref(false);
export const userId = ref<string | null>(null);
export const userName = ref<string | null>(null); // Ajout du prénom

export const setAuthenticationStatus = (status: boolean) => {
  isAuthenticated.value = status;
};

export const getSession = async () => {
  const isDebug = useAppConfig().debug;
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
    
  try {
    const response = await fetch(`${baseUrl}/api/auth/session`);
    
    const data = await response.json();
    if (data?.userId) {
      userId.value = data.userId;
      userName.value = data.name; // Stocker le prénom
      setAuthenticationStatus(true);
      return true;  // connecté
    } else {
      if (isDebug) {
        console.warn('Aucune session utilisateur trouvée.');
      }
      userId.value = null;
      userName.value = null; // Réinitialiser le prénom
      setAuthenticationStatus(false);
      return false;  // non connecté
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la session :', error);
    userId.value = null;
    userName.value = null; // Réinitialiser le prénom
    setAuthenticationStatus(false);
    return false;  // Erreur de récupération de la session
  }
};

export const logout = async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
    userId.value = null;
    userName.value = null; // Réinitialiser le prénom
    setAuthenticationStatus(false);
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error);
  }
};
