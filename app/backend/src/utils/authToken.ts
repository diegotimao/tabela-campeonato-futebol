import * as Jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import IHeader from '../dto/headerDto';
import Exeption from './exeption';

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

const jwtDefaultConfig: SignOptions = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

export default class AuthToken {
  constructor(private jwtConfig?: SignOptions) {
    if (!jwtConfig) {
      this.jwtConfig = jwtDefaultConfig;
    }
  }

  async gerarToken(payload: IHeader) {
    return Jwt.sign(payload, SECRET, this.jwtConfig);
  }

  async autenticateToken(token: string) {
    try {
      const autorization: Jwt.JwtPayload = Jwt.verify(
        token,
        SECRET,

        this.jwtConfig,
      ) as Jwt.JwtPayload;
      return autorization.role;
    } catch (error) {
      throw new Exeption(400, 'Token invalid');
    }
  }
}
