import { hash } from 'bcrypt';

export const useCryptage = () => {
  const cryptPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await hash(password, saltRounds);
  };

  return {
    cryptPassword,
  };
};
