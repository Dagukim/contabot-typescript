import { createServer } from "http";

const healthCheck = createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("OK");
    res.end();
});

export { healthCheck };
