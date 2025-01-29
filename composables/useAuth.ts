export const isAuthenticated = ref(false)

export const setAuthenticationStatus = (status: boolean) => {
  isAuthenticated.value = status
}
