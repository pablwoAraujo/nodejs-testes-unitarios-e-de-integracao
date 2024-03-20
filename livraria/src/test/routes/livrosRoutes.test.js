import {
  afterEach, beforeEach, describe, expect, it, jest,
} from '@jest/globals';
import request from 'supertest';
import app from '../../app';

let server;
beforeEach(() => {
  const port = 3001;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /livros', () => {
  it('Deve retornar uma lista de livros', async () => {
    await request(app)
      .get('/livros')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
});

describe('GET em /livros/id', () => {
  it('Deve retornar um recurso selecionado', async () => {
    const livroId = 1;
    await request(app)
      .get(`/livros/${livroId}`)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
});

let idResposta;
describe('POST em /livros', () => {
  it('Deve adicionar uma novo livro', async () => {
    const objLivro = {
      titulo: 'Meu livro',
      paginas: 200,
      editora_id: '1',
      autor_id: '1',
    };

    const resposta = await request(app)
      .post('/livros')
      .send(objLivro)
      .expect(201);

    idResposta = resposta.body.content.id;
  });

  it('Deve nao adicionar nada ao passar o body vazio', async () => {
    await request(app)
      .post('/livros')
      .send({})
      .expect(400);
  });
});

describe('PUT em /livros/id', () => {
  test.each([
    ['titulo', { titulo: 'Casa do Codigo' }],
    ['paginas', { paginas: 300 }],
    ['editora_id', { editora_id: '2' }],
    ['autor_id', { autor_id: '2' }],
  ])('Deve alterar o campo %s', async (key, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app)
      .put(`/livros/${idResposta}`)
      .send(param)
      .expect(204);

    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE em /livros/id', () => {
  it('Deletar o recurso adcionado', async () => {
    await request(app)
      .delete(`/livros/${idResposta}`)
      .expect(200);
  });
});
