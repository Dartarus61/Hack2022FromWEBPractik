import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/api", (req, res) => {
  res.json({
    message: "hello",
  });
});

app.listen(PORT, () => {
  console.log(`Server is started on ${PORT}`);
});
