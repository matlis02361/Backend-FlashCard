import express from "express";
import cors from "cors";
import multer from "multer";


const app = express();
const port = 5889;


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
