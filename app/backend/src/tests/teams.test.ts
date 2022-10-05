import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http'); 
// import * as Sinon from 'sinon';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando as funcionalidades das rotas de Teams GET', () => {
  it('Ao acessar a /teams, é esperando o status 200', async () => {
    const result = await chai.request(app).get('/teams');
    expect(result).to.have.status(200);
  });

  it('Ao Acessar a /teams/:id deve retornar o status 200', async () => {
    const result = await chai.request(app).get('/teams/4');
    expect(result).to.have.status(200);
  });
})