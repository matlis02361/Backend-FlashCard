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
const port = 5899;

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

const checkTranslationFile = () => {
  const fs = import("fs");

  try {
    if (fs.statSync("./data/uploadedFiles/translations.xlsx")) {
      import("./import.mjs").then((module) => {
        module.convert();
      });
    } else {
      console.log("file not found");
    }
  } catch (err) {
    console.log("file not found");
  }
};

checkTranslationFile();
// import express from "express": Wir verwenden das Express-Modul, um einen Server-Anwendung zu erstellen.
// import cors from "cors": Wir verwenden das cors-Modul, um unserer Anwendung die Kommunikation mit Ressourcen aus externen Quellen zu ermöglichen.
// import multer from "multer": Wir verwenden das Multer-Modul, um unserer Anwendung das Senden von Dateien zu ermöglichen.
// import { join, dirname } from "path": Wir verwenden das Path-Modul, um einen Dateipfad zu verbinden und auszulesen.
// import path from "path": Wir verwenden das Path-Modul, um einen Dateipfad auszulesen.
// import { fileURLToPath } from "url": Wir verwenden das URL-Modul, um den URL-Adresse in einen Dateipfad zu konvertieren.
// const __dirname = dirname(fileURLToPath(import.meta.url)): Wir verwenden dirname() und fileURLToPath(), um den Pfad der aktuellen Datei auszulesen.
// const dbFile = join(__dirname, "/data/db.json"): Wir verwenden join(), um den Pfad der aktuellen Datei mit dem Namen der Datenbankdatei zu verbinden.
// const adapter = new JSONFile(dbFile): Wir verwenden JSONFile(), um unsere Datenbank zu laden.
// const db = new Low(adapter): Wir verwenden Low(), um unseren Adapter für die Datenbank zu konfigurieren.
// const [cards, setCards] = useState(''): Wir verwenden useState(), um den Anfangszustand unserer Karten festzulegen.
// const app = express(): Wir erstellen unsere Express-Anwendung.
// const port = 5889: Wir setzen den Port, auf dem unsere Anwendung lauschen wird.
// const staticDirectory = path.join(__dirname, "./data"): Wir verwenden join(), um den Pfad der aktuellen Datei mit dem Namen des Datenordners zu verbinden.
// app.use(express.static(staticDirectory)): Wir verwenden express.static(), um auf unsere Daten zuzugreifen.
// const storage = multer.diskStorage({}: Wir verwenden multer.diskStorage(), um zu bestimmen, wo die hochgeladenen Dateien gespeichert werden.
// destination: (req, file, cb) => { cb(null, "data/uploadedFiles/")}: Wir bestimmen den Ordner, in den hochgeladene Dateien gespeichert werden.
// filename: (req, file, cb) => { cb(null, "translations.xlsx")}: Wir bestimmen den Namen der hochzuladenden Datei.
// const upload = multer({ storage: storage }): Wir verwenden multer(), um unseren Storage zu konfigurieren.
// app.use(cors()): Wir verwenden cors(), um unserer Anwendung die Kommunikation mit Ressourcen aus externen Quellen zu ermöglichen.
// app.post("/uploadfile", upload.single("file")): Wir verwenden app.post(), um eine Datei mithilfe des HTTP-Protokolls zu senden.
