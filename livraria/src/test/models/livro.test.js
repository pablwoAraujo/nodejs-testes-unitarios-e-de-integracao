import {
  describe, expect, it, jest,
} from '@jest/globals';
import Livro from '../../models/livro';

describe('Testando o modelo Livro', () => {
  const objLivro = {
    titulo: 'Meu livro',
    paginas: 200,
    editora_id: '1',
    autor_id: '1',
  };

  it('Deve instanciar um novo livro', () => {
    const livro = new Livro(objLivro);

    expect(livro).toEqual(
      expect.objectContaining(objLivro),
    );
  });

  it('Deve fazer uma chamada simulada ao banco de dados', () => {
    const livro = new Livro(objLivro);

    livro.salvar = jest.fn().mockReturnValue({
      id: 1,
      titulo: 'Meu livro',
      paginas: 200,
      editora_id: '1',
      autor_id: '1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    const retorno = livro.salvar();

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objLivro,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
});
