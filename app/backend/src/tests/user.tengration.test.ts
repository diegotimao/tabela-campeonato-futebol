import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http'); 
import * as Sinon from 'sinon';
import { app } from '../app';
import LoginDTO from '../dto/loginDto';
import User from '../database/models/user';

chai.use(chaiHttp);

const { expect } = chai;

interface ILoginMock {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

const useMockReceves: ILoginMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const useMockEnvio: ILoginMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'secret_admin'
}

const tokenMockValid: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFciLCJpYXQiOjE2NjQ5MjI3NjQsImV4cCI6MTY2NTA5NTU2NH0.ZnmO08srhmoBRpQk2V7K-jTamJl4Vq62x6Gr-teXogk'
const tokenMockInvalid: string = 'eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFciLCJpYXQiOjE2NjQ5MjI3NjQsImV4cCI6MTY2NTA5NTU2NH0.ZnmO08srhmoBRpQk2VK-jTamJl4Vq62x6Gr-teXogk'

describe('Testando o metodo POST', async () => {

  afterEach(Sinon.restore); 

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

  it('Deve retornar o status 200', async () => {
    Sinon.stub(User, 'findOne').resolves(useMockReceves as unknown as User);
    const response = await chai.request(app).post('/login').send(useMockEnvio);
    console.log(response.body)
    expect(response).to.have.status(200);
  });

  it('Deve retornar o status 401', async () => {
    Sinon.stub(User, 'findOne').resolves(null);
    const response = await chai.request(app).post('/login').send(useMockEnvio);
    expect(response).to.have.status(401);
  });

  it('Testando a rota validate com um token válido', async () => {
    const response = await 
    chai.request(app).get('/login/validate').set('autorization', 'Bearer' + tokenMockValid);
    expect(response.body).to.be.a('object');
  });

  
  it('Testando a rota validate sem o token', async () => {
    const response = await 
    chai.request(app).get('/login/validate').set('autorization', 'Bearer' + '');
    expect(response).to.have.status(400);
  });
  
  it('Testando a rota validate com token inválido', async () => {
    const response = await 
    chai.request(app).get('/login/validate').set('autorization', 'Bearer' + tokenMockInvalid);
    expect(response).to.have.status(400);
  });
});