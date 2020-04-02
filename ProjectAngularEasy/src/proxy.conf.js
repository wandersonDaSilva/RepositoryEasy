const PROXY_CONF = [
  {
    context:['/api/*'],
    target:'https://localhost:44337/api/candidato',
    secure: true,
    logLevel: 'debug',
  }
];

module.exports = PROXY_CONF;
