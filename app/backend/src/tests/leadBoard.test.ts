import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http'); 
import * as Sinon from 'sinon';
import { app } from '../app';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota leadBoard', () => {
  it('Testando se retorna status 200', async () => {
    const response = await chai.request(app).get('/leaderboard');
    expect(response).to.have.status(200);
  })
})