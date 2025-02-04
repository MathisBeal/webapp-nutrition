import { useNotification } from "@kyvg/vue3-notification";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const router = useRouter();

  const { notify } = useNotification();
  const publicRoutes = ['/login', '/signup'];

  if (publicRoutes.includes(to.path)) {
    return;
  }

  // Vérifier l'état de la session utilisateur
  const isAuthenticated = await getSession();
  console.log('isAuthenticated:', isAuthenticated);
  console.error('isAuthenticated:', isAuthenticated);

  if (!isAuthenticated) {
    notify({
      type: 'error',
      title: 'Erreur',
      text: 'Vous devez être connecté pour accéder à cette page.'
    });
    return router.push('/login');
  }
});
