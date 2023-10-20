import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Authentication {
  public static passwordHash = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  };

  public static passwordCompare = async (text: string, encryptedText: string): Promise<boolean> => {
    let result = await bcrypt.compare(text, encryptedText);

    return result;
  };

  public static generateToken = (id: number, username: string, password: string, timeLimit?: string): string => {
    const secretKey: string = process.env.JWT_SECRET_KEY || 'secret';

    let token: string = '';
    if (!timeLimit) {
      token = jwt.sign({ id, username, password }, secretKey);
    } else {
      token = jwt.sign({ id, username, password }, secretKey, { expiresIn: timeLimit });
    }

    return token;
  };
}

export default Authentication;
