import express from "express";

const app = express();
const port = 3000;
const STATIC_DIR_WEB = "../web/dist";
const STATIC_DIR_ADMIN = "../admin/dist";

app.use("/", express.static(STATIC_DIR_WEB));
app.use("/admin", express.static(STATIC_DIR_ADMIN));

app.get("/hello", (req, res) => {
  res.send("World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
