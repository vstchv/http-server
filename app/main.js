const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Listening on port 4221");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const request = data.toString();

    const [requestLine] = request.split("\r\n");
    const [method, path, httpVersion] = requestLine.split(" ");

    let response;
    if (method === "GET") {
      if (path === "/") response = "HTTP/1.1 200 OK\r\n\r\n";
      else if (path.startsWith("/echo/")) {
        const echoString = path.slice("/echo/".length);
        const contentLength = Buffer.byteLength(echoString, "utf-8");
        response =
          `HTTP/1.1 200 OK\r\n` +
          `Content-Type: text/plain\r\n` +
          `Content-Length: ${contentLength}\r\n\r\n` +
          echoString;
      } else {
        response = "HTTP/1.1 404 Not Found\r\n\r\n";
      }
    } else {
      response = "HTTP/1.1 404 Not Found\r\n\r\n";
    }

    console.log(response);

    socket.write(response);
    socket.end();
  });
});
server.listen(4221, "::"); // binds to IPv6 and may accept IPv4-mapped addresses
