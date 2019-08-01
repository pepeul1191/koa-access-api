const chatSocket = require('../sockets/chat');

var registerApp = function registerApp(app){
  chatSocket.socket.attach(app);
  // console.log(chatSocket);
}

exports.registerApp = registerApp;
