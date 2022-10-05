import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http'); 
// import * as Sinon from 'sinon';
import { app } from '../app';
import LoginDTO from '../dto/loginDto';

chai.use(chaiHttp);

const { expect } = chai;

const useMock: LoginDTO = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

const tokenMockValid: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFciLCJpYXQiOjE2NjQ5MjI3NjQsImV4cCI6MTY2NTA5NTU2NH0.ZnmO08srhmoBRpQk2V7K-jTamJl4Vq62x6Gr-teXogk'
const tokenMockInvalid: string = 'eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFciLCJpYXQiOjE2NjQ5MjI3NjQsImV4cCI6MTY2NTA5NTU2NH0.ZnmO08srhmoBRpQk2VK-jTamJl4Vq62x6Gr-teXogk'

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

  it('Deve retornar o status 200', async () => {
    const response = await chai.request(app).post('/login').send(useMock);

    expect(response).to.have.status(200);
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