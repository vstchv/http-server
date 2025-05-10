const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Listening on port 4221");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const resp = "HTTP/1.1 200 OK\r\n\r\n";
    socket.write(resp);
    socket.end();
  });
});
server.listen(4221, "::"); // binds to IPv6 and may accept IPv4-mapped addresses
