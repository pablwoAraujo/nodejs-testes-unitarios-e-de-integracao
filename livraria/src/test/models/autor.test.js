import {
  describe, expect, it, jest,
} from '@jest/globals';
import Autor from '../../models/autor';

describe('Testando o modelo Autor', () => {
  const objAutor = {
    nome: 'Pablwo',
    nacionalidade: 'Brasileiro',
  };

  it('Deve instanciar um novo autor', () => {
    const autor = new Autor(objAutor);

    expect(autor).toEqual(
      expect.objectContaining(objAutor),
    );
  });

  it('Deve fazer uma chamada simulada ao banco de dados', () => {
    const autor = new Autor(objAutor);

    autor.salvar = jest.fn().mockReturnValue({
      id: 1,
      nome: objAutor.nome,
      nacionalidade: objAutor.nacionalidade,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    const retorno = autor.salvar();

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objAutor,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
});
