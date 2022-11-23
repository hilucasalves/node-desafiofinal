import AuthRepository from '../repositories/auth.repository.js';

function getRole(auth) {
  if (auth.username === 'admin') return 'admin';
  else return 'user';
}

function authorize(...allowed) {
  const isAllowed = role => role === 'admin' || allowed.indexOf(role) > -1;
  return async (req, res, next) => {
    try {
      const username = req.auth.user;
      if (username) {
        const password = req.auth.password;
        const auth = { username: username, password: password };
        const role = getRole(auth);
        if (role === 'user') {
          const cliente = await AuthRepository.getClienteLogin(
            username,
            password
          );
          let cliente_id = cliente.cliente_id;
          if (!req.query.cliente_id) req.query.cliente_id = cliente_id;
          if (
            (req.params.cliente_id && req.params.cliente_id != cliente_id) ||
            (req.body.cliente_id && req.body.cliente_id != cliente_id) ||
            (req.query.cliente_id && req.query.cliente_id != cliente_id)
          ) {
            throw new Error('Procedimento não autorizado');
          }
        }
        if (isAllowed(role)) next();
        else res.status(401).send('Role not allowed');
      } else res.status(403).send('User not found');
    } catch (err) {
      next(err);
    }
  };
}

async function myAuth(user, pass, callback) {
  let userMatch = user === 'admin';
  let pwdMatch = pass === 'desafio-igti-nodejs';

  if (userMatch && pwdMatch) return callback(null, true);
  else {
    const cliente = await AuthRepository.getClienteLogin(user, pass);

    if (cliente?.cliente_id) {
      userMatch = user === cliente.email;
      pwdMatch = pass === cliente.senha;
      if (userMatch && pwdMatch) return callback(null, true);
    } else return callback(null, false);
  }
}

export default { authorize, myAuth };
