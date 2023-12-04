require("dotenv").config();

const app = require("./app");
const dbConnect = require("./db/mongoConnect");
const { HOST } = process.env;

async function startServer() {
  try {
    await dbConnect();
    app.listen(HOST, () => {
      console.log(`Server running. Use our API on port: ${HOST}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
