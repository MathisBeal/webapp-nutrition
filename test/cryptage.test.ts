import * as bcrypt from 'bcrypt';

describe('bcrypt library', () => {
  const password = 'mySecretPassword';
  let hashedPassword: string;

  it('should generate a hash from a password', async () => {
    hashedPassword = await bcrypt.hash(password, 10);
    expect(hashedPassword).toBeDefined();
    expect(hashedPassword).not.toBe(password);
  });

  it('should compare the hashed password with the original password', async () => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    expect(isMatch).toBe(true);
  });

  it('should fail to compare the hashed password with a wrong password', async () => {
    const isMatch = await bcrypt.compare('wrongPassword', hashedPassword);
    expect(isMatch).toBe(false);
  });
});
