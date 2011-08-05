
// to run: node chat_exp.js
// connect1: "telnet 127.0.0.1 8000"
// connect2: "telnet 127.0.0.1 8000"
// write 

var net = require('net');
var clients = [];
var server = net.createServer();

server.on('connection', function(conn) {
  console.log("Hellooo! got a connection");
  clients.push(conn);
  conn.write("hello client");
  conn.name = conn.remoteAddress+" "+conn.remotePort;
  conn.setEncoding('utf8');
  conn.on('data', function(d){
    console.log(d);
    broadcast(conn, d);
  })
});

function broadcast(client, message){
  for(i=0; i< clients.length; i+=1){
    if(clients[i] != client){
      clients[i].write(client.name+ " says "+ message);
    }
  }
}

server.listen(8000);

