import * as Jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import IHeader from '../dto/headerDto';
import Exeption from './exeption';

const SECRET = 'jwt_secret';

// const SECRET  = process.env.JWT_SECRET;

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

  public gerarToken(payload: IHeader) {
    return Jwt.sign(payload, SECRET, this.jwtConfig);
  }

  public async autenticateToken(token: string) {
    if (!token) {
      throw new Exeption(401, 'Token notfound.');
    }

    try {
      const autorization = Jwt.verify(token, SECRET, this.jwtConfig);
      return autorization;
    } catch (error) {
      throw new Exeption(401, 'Token invalid');
    }
  }
}
