import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123qweasdzxc",
  database: "test",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.cover];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("data");
  });
});

app.delete("/books/:id", (req, res) => {
  const booksId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [booksId], (err, data) => {
    if (err) return res.json(err);
    return res.json("books deleted");
  });
});

app.put("/books/:id", (req, res) => {
  const booksId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ? WHERE id = ?";

  const values = [req.body.title, req.body.desc, req.body.cover];

  db.query(q, [...values, booksId], (err, data) => {
    if (err) return res.json(err);
    return res.json("books updated");
  });
});

app.listen(process.env.PORT || 8800, () => {
  console.log("object");
});
