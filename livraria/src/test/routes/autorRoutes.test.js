import {
  afterEach, beforeEach, describe, expect, it, jest,
} from '@jest/globals';
import request from 'supertest';
import app from '../../app';

let server;
beforeEach(() => {
  const port = 3002;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /autores', () => {
  it('Deve retornar uma lista de autores', async () => {
    await request(app)
      .get('/autores')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
});

describe('GET em /autores/id', () => {
  it('Deve retornar um recurso selecionado', async () => {
    const autorId = 1;
    await request(app)
      .get(`/autores/${autorId}`)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
});

describe('GET em /autores/id/livros', () => {
  it('Deve retornar a lista de livros de um autor selecionado', async () => {
    const autorId = 1;
    await request(app)
      .get(`/autores/${autorId}/livros`)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
});

let idResposta;
describe('POST em /autores', () => {
  it('Deve adicionar uma novo autor', async () => {
    const objAutor = {
      nome: 'Pablwo',
      nacionalidade: 'Brasileiro',
    };

    const resposta = await request(app)
      .post('/autores')
      .send(objAutor)
      .expect(201);

    idResposta = resposta.body.content.id;
  });

  it('Deve nao adicionar nada ao passar o body vazio', async () => {
    await request(app)
      .post('/autores')
      .send({})
      .expect(400);
  });
});

describe('PUT em /autores/id', () => {
  test.each([
    ['nome', { nome: 'Mattheus' }],
    ['nacionalidade', { nacionalidade: 'Argentino' }],
  ])('Deve alterar o campo %s', async (key, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app)
      .put(`/autores/${idResposta}`)
      .send(param)
      .expect(204);

    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE em /autores/id', () => {
  it('Deletar o recurso adicionado', async () => {
    await request(app)
      .delete(`/autores/${idResposta}`)
      .expect(200);
  });
});
