import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http'); 
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando o metodo POST', async () => {
  it('Deve retornar o status 400, se o email não for passada.', async () => {
    const result = await chai.request(app).post('/login').send({
      email: '',
      password: '123123',
    });
    expect(result).to.have.status(400);
  });


  it('Deve retornar o status 400, se a senha não for passada.', async () => {
    const result = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: '',
    });
    expect(result).to.have.status(400);
  });
});