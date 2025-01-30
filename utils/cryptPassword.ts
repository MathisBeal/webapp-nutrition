import { hash } from 'bcrypt';

/**
 * Encrypts a given password using bcrypt hashing algorithm.
 *
 * @param password - The plain text password to be encrypted.
 * @returns A promise that resolves to the hashed password.
 */
const cryptPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await hash(password, saltRounds);
};

export { cryptPassword };
