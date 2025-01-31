export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession();

  const publicRoutes = ['/', '/login', '/signup'];

  if (publicRoutes.includes(to.path)) {
    return;
  }
  return;
  // if (!loggedIn.value) {
  //   return navigateTo({
  //     path: '/login',
  //     query: { error: `You must be logged in to access this page : ${to.path}` },
  //   });
})
