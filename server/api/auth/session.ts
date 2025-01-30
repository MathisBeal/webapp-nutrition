import { createError, sendError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event);

    if (!session) {
      throw createError({
        statusCode: 401,
        message: 'Non connecté.',
      });
    }

    return session;
  } catch (error) {
    return sendError(event, error as Error);
  }
});
