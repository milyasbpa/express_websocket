import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();
const server = http.createServer(app); // Create HTTP server
const wss = new WebSocket.Server({ server }); // Attach WebSocket server to HTTP server

// WebSocket event handling
wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    console.log("Received:", message.toString());
    ws.send(`Server received: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// HTTP route for testing
app.get("/", (req, res) => {
  res.send("WebSocket server is running!");
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
