#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from "../app.js";
import http from "http";
import createWebsocketServer from "../websocket/websocket.js";

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

/**
 * Create HTTP server.
 */
const httpServer = http.createServer(app);

/**
 * Create Socket.io server.
 */
createWebsocketServer(httpServer);

/**
 * Listen on provided port, on all network interfaces.
 */
httpServer.listen(port);
httpServer.on("error", onError);
httpServer.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = httpServer.address();
  let bind: string;
  if (addr) {
    if (typeof addr === "string") {
      bind = "pipe " + addr;
    } else {
      bind = "port " + addr.port;
    }
  } else {
    bind = "unknown";
  }
  console.log("Listening on " + bind);
}
