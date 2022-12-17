import express from "express";
import cors from "cors";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/documents1", (req, res) => {
  fs.readFile(
    path.resolve(__dirname, "db/documents1.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      res.json(JSON.parse(data));
    }
  );
});

app.listen(process.env.PORT || 8800, () => {
  console.log("object");
});
