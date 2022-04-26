let io;

module.exports = {
  init: (httpServer) => {
    // require socket.io and you can execute it at the same time (and save whatever is given to us to the io variable)
    io = require("socket.io")(httpServer, {
      // this object allows options to be used
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io is not initialized");
    }
    return io;
  },
};
