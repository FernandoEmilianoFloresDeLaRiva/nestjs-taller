export interface PasswordHashRepositoryI {
  hashedPassword(password: string): Promise<string>;
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}
