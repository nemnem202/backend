import * as argon2 from "argon2";

export class PasswordHandler {
  static generate_hash = async (password: string): Promise<string | null> => {
    try {
      const hash = await argon2.hash(password);
      return hash;
    } catch (err) {
      console.error("[HASH ERROR] : ", err);
      return null;
    }
  };

  static chech_validity = async (password: string, hash: string): Promise<boolean | null> => {
    try {
      if (await argon2.verify(hash, password)) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error("[HASH VERIF ERROR] : ", err);
      return null;
    }
  };
}
