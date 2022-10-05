import { compareSync } from 'bcryptjs';
import AuthToken from '../utils/authToken';
import Exeption from '../utils/exeption';
import LoginDTO from '../dto/loginDto';
import User from '../database/models/user';
import IHeader from '../dto/headerDto';

export default class UserService {
  constructor(private userModel: typeof User, private auth: AuthToken) {}

  async autentication(loginDTO: LoginDTO) {
    if (!loginDTO.email || !loginDTO.password) throw new Exeption(400, 'All fields must be filled');

    const user = await this.userModel.findOne({
      where: { email: loginDTO.email },
    });

    if (!user) throw new Exeption(401, 'Incorrect email or password');

    const headerJWT: IHeader = {
      id: user.getDataValue('id'),
      username: user.getDataValue('username'),
      email: user.getDataValue('email'),
      role: user.getDataValue('role'),
      password: user.getDataValue('password'),
    };

    const isHasch = compareSync(loginDTO.password, headerJWT.password);

    if (!isHasch) throw new Exeption(401, 'Incorrect email or password');

    const tokenCreate = new AuthToken();
    const token = await tokenCreate.gerarToken(headerJWT);
    return { token };
  }

  async validate(token: string) {
    const isValidAuth = await this.auth.autenticateToken(token);

    return isValidAuth;
  }
}
