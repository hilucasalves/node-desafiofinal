import { getClient, ObjectID } from './mongo.db.js';

async function createLivroInfo(post) {
  const client = getClient();
  try {
    await client.connect();
    await client.db('livraria').collection('livroinfo').insertOne(post);
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

async function updateLivroInfo(post) {
  const client = getClient();
  try {
    await client.connect();
    await client
      .db('livraria')
      .collection('livroinfo')
      .updateOne({ livro_id: post.livro_id }, { $set: { ...post } });
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

async function deleteLivroInfo(id) {
  const client = getClient();
  try {
    await client.connect();
    return await client
      .db('livraria')
      .collection('livroinfo')
      .deleteOne({ livro_id: id });
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

async function getLivroInfos() {
  const client = getClient();
  try {
    await client.connect();
    return await client
      .db('livraria')
      .collection('livroinfo')
      .find({})
      .toArray();
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

async function getLivroInfo(id) {
  const client = getClient();
  try {
    await client.connect();
    return await client
      .db('livraria')
      .collection('livroinfo')
      .findOne({ livro_id: id });
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

async function createAvaliacao(avaliacao, id) {
  try {
    const post = await getLivroInfo(id);
    if (!post.avaliacoes) post.avaliacoes = [];
    post.avaliacoes.push(avaliacao);
    await updateLivroInfo(post);
  } catch (err) {
    throw err;
  }
}

async function deleteAvaliacao(id, index) {
  try {
    const post = await getLivroInfo(id);
    post.avaliacoes.splice(index, 1);
    await updateLivroInfo(post);
  } catch (err) {
    throw err;
  }
}

export default {
  createLivroInfo,
  updateLivroInfo,
  getLivroInfo,
  createAvaliacao,
  deleteAvaliacao,
  getLivroInfos,
  deleteLivroInfo,
};
