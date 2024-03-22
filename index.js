const express = require("express");
const app = express();

const userRouter = require("./routers/user.routers");
const movieRouter = require("./routers/movie.routers");
app.use(express.json());

require("./db");

app.get("/", (req, res) => {
  res.send("Welcome to the User API Documentation");
});

app.use("/user", userRouter);
app.use("/movies", movieRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ error: "Something went wrong " });
});

const PORT = process.env.Port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
