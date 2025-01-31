export default defineEventHandler(async (event) => {
  try {
    await clearUserSession(event);

    return {
      success: true,
      message: 'Déconnexion réussie.',
    };
  } catch (error) {
    return sendError(event, error as Error);
  }
});
