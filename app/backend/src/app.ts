import * as express from 'express';
import TeamsController from './controller/teamsController';
import UserService from './services/userService';
import UserController from './controller/userController';
import User from './database/models/user';
import errorMiddleware from './middleware/error.middleware';
import AuthToken from './utils/authToken';
import TeamService from './services/teamServices';
import Teams from './database/models/teams';
import MatchesController from './controller/matchesController';
import MatchesServices from './services/matcheServices';
import Matches from './database/models/matches';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    this.app.use(express.json());
    this.app.use(accessControl);

    const auth = new AuthToken();
    const userController = new UserController(new UserService(User, auth));
    const teamsController = new TeamsController(new TeamService(Teams));
    const matchesController = new MatchesController(new MatchesServices(Matches));

    this.app.post('/login', (req, res, next) => userController.login(req, res, next));
    this.app.get('/login/validate', (req, res, next) => userController.validate(req, res, next));
    this.app.get('/teams', (req, res, next) => teamsController.getAll(req, res, next));
    this.app.get('/teams/:id', (req, res, next) => teamsController.getOne(req, res, next));

    this.app.get('/matches', (req, res, next) => matchesController.getMatches(req, res, next));

    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
