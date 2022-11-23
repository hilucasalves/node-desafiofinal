const supertest = require('supertest');

const req = supertest('http://localhost:3000');
const admin = { user: 'admin', pass: 'desafio-igti-nodejs' };
let user = { user: null, pass: null };
let autor = { autor_id: 0, nome: 'test', email: 'test', telefone: 'test' };
let livro = {
  livro_id: 0,
  nome: 'test',
  valor: 10.5,
  estoque: 100,
  autor_id: 0,
};

let cliente = {
  cliente_id: 0,
  nome: 'test',
  email: 'test@test.com',
  senha: 'test',
  telefone: 'test',
  endereco: 'test',
};

let venda = {
  venda_id: 0,
  data: '2022-01-01',
  valor: 0,
  cliente_id: 0,
  livro_id: 0,
};

afterAll(async () => {
  let resp = null;
  resp = await req
    .delete(`/venda/${venda.venda_id}`)
    .auth(admin.user, admin.pass);
  expect(resp.status).toBe(200);
  resp = await req
    .delete(`/livro/${livro.livro_id}`)
    .auth(admin.user, admin.pass);
  expect(resp.status).toBe(200);
  resp = await req
    .delete(`/autor/${autor.autor_id}`)
    .auth(admin.user, admin.pass);
  expect(resp.status).toBe(200);
  resp = await req
    .delete(`/cliente/${cliente.cliente_id}`)
    .auth(admin.user, admin.pass);
  expect(resp.status).toBe(200);
});

describe('Testes de Integração - Server', () => {
  test('0) Resposta de Servidor', async () => {
    const resp = await req.get('/').auth(admin.user, admin.pass);
    expect(resp.status).toBe(200);
  });
});

describe('Testes de Integração - Admin', () => {
  test('1) Criar autor. 2) Verificar se autor foi criado.', async () => {
    const res = await req
      .post('/autor')
      .auth(admin.user, admin.pass)
      .send(autor);
    expect(res.status).toBe(200);
    expect(res.body.autor_id).toBeDefined();
    expect(res.body.autor_id).not.toBe(0);
    autor.autor_id = res.body.autor_id;
    expect(res.body).toMatchObject(autor);
  });

  test('3) Criar livro para autor criado anteriormente. 4) Verificar se livro foi criado.', async () => {
    expect(autor.autor_id).toBeDefined();
    expect(autor.autor_id).not.toBe(0);
    livro.autor_id = autor.autor_id;
    const res = await req
      .post('/livro')
      .auth(admin.user, admin.pass)
      .send(livro);
    expect(res.status).toBe(200);
    expect(res.body.livro_id).toBeDefined();
    expect(res.body.livro_id).not.toBe(0);
    livro.livro_id = res.body.livro_id;
    expect(res.body).toMatchObject(livro);
  });

  test('5) Criar cliente. 6) Verificar se cliente foi criado.', async () => {
    const res = await req
      .post('/cliente')
      .auth(admin.user, admin.pass)
      .send(cliente);
    expect(res.status).toBe(200);
    expect(res.body.cliente_id).toBeDefined();
    expect(res.body.cliente_id).not.toBe(0);
    cliente.cliente_id = res.body.cliente_id;
    let senha = cliente.senha;
    delete cliente.senha;
    expect(res.body).toMatchObject(cliente);
    user.user = cliente.email;
    user.pass = senha;
  });
});

describe('Testes de Integração - User', () => {
  test('1) Buscar livro criado utilizando login do usuário criado e verificar retorno.', async () => {
    expect(user.user).toBeDefined();
    expect(user.user).not.toBeNull();
    expect(user.pass).toBeDefined();
    expect(user.pass).not.toBeNull();
    expect(livro.livro_id).not.toBe(0);
    const res = await req
      .get(`/livro/${livro.livro_id}`)
      .auth(user.user, user.pass);
    expect(res.status).toBe(200);
    expect(res.body.cliente_id).not.toBe(0);
    expect(res.body).toMatchObject(livro);
  });

  test('2) Criar venda com usuário e livro criados. 3) Verificar se venda foi criada.', async () => {
    expect(livro.livro_id).toBeDefined();
    expect(livro.livro_id).not.toBe(0);
    venda.livro_id = livro.livro_id;
    expect(cliente.cliente_id).toBeDefined();
    expect(cliente.cliente_id).not.toBe(0);
    venda.cliente_id = cliente.cliente_id;
    const res = await req.post('/venda').auth(user.user, user.pass).send(venda);
    expect(res.status).toBe(200);
    expect(res.body.venda_id).toBeDefined();
    expect(res.body.venda_id).not.toBe(0);
    venda.venda_id = res.body.venda_id;
    venda.valor = res.body.valor;
    expect(res.body).toMatchObject(venda);
  });
});
