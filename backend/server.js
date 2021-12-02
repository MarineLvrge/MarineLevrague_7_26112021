// Import du package HTTP natif de Node
const http = require('http');
// Import du fichier app
const app = require('./app');

// Fonction qui s'assure que le port fourni est bien un nombre ou un string, retourne false si ce n'est pas le cas
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) { // Fonction qui teste la valeur du port
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Fonction qui cherche et gère les erreurs de manière appropriée
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Création du server
const server = http.createServer(app);

// Ecouteur d'évènements qui consigne le port ou le canal nommé sur lequel le serveur s'exécute dans la console
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);