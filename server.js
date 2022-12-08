import express from "express";
import cors from "cors";
import multer from "multer";
import { join, dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import { Low, JSONFile } from "lowdb";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = join(__dirname, "/data/db.json");
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);


const app = express();
const port = 5889;

const staticDirectory = path.join(__dirname, "./data");
app.use(express.static(staticDirectory));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "data/uploadedFiles/");
  },
  filename: (req, file, cb) => {
    cb(null, "translations.xlsx");
  },
});

const upload = multer({ storage: storage });

app.use(cors());

app.post("/uploadfile", upload.single("file"));

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
