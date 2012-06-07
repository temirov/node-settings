var localhost = '127.0.0.1';

module.exports = {
  appServer: {
    server: localhost,
    port: 3000  
  },
  auth: {
    withTestUser: 'no'
  },
  http: {
    // Default timeout on the long-time operations.
    defaultTimeoutInSeconds: 60
  }
};
