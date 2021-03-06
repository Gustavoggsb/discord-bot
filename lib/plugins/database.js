const mongoose = require("mongoose");

const url = process.env.DATABASE_URL;

module.exports = {
  connect: async () => {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Conexão com o MongoDB estabelecida");
    } catch (error) {
      console.error("Erro ao conectar com o MongoDB");
      process.exit(1);
    }
  },
  User: mongoose.model("User", {
    _id: String,
    name: String,
    nickname: String,
    age: Number,
  }),
};
