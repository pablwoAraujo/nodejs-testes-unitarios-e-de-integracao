import { describe, expect, it } from '@jest/globals';
import Editora from '../../models/editora';

describe('Testando o modelo Editora', () => {
  const objEditora = {
    nome: 'CDC',
    cidade: 'Campina Grande',
    email: 'cdc@g.com',
  };

  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(objEditora);

    expect(editora).toEqual(
      expect.objectContaining(objEditora),
    );
  });

  it.skip('Deve salvar a editora no banco de dados', () => {
    const editora = new Editora(objEditora);

    editora.salvar().then((dados) => {
      expect(dados.nome).toBe(objEditora.nome);
    });
  });

  it('Deve salvar a editora no banco de dados usando a sintaxe moderna', async () => {
    const editora = new Editora(objEditora);

    const dados = await editora.salvar();
    const dadosDoBanco = await Editora.pegarPeloId(dados.id);

    expect(dadosDoBanco).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
});
