export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  // TODO: Fetch some stats based on the user
  return {
    message: `Bonjour ${user.name}, bienvenue sur votre tableau de bord !`,
    role: user.role,
    email: user.email,
    stats: {
      tasksCompleted: 42, // Exemple
      lastLogin: '2025-01-22', // Exemple
    }
  }
})
