import cors from "cors";
import express from "express";
import { initializeApp } from "firebase/app";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadString,
} from "firebase/storage";
import morgan from "morgan";
import multer from "multer";
import { getFirebaseConfig } from "./firebase-config.js";

const upload = multer({
  storege: multer.memoryStorage(),
  fileFilter: function (req, file, cb) {
    // Accept image file only
    !file.mimetype.includes("image")
      ? cb(new Error("Uploaded file must be an image."))
      : cb(null, true);
  },
}).single("image");

const app = express();

app.use(cors());

// Initialize Firebase app
initializeApp(getFirebaseConfig());

// Remove files older than 30 days
app.use(async (req, res, next) => {
  const thirtyDaysOldTS = new Date().setDate(new Date().getDate() - 30);
  try {
    const oldFiles = (await listAll(ref(getStorage()))).items.filter(
      // Files are named like, <timestamp>.<extenstion>
      (item) => item.name.split(".")[0] < thirtyDaysOldTS
    );
    if (!oldFiles) {
      oldFiles.forEach((file) => deleteObject(file));
    }
  } finally {
    next();
  }
});

// Serve React build
app.use(express.static("dist"));

if (app.get("env") === "development") {
  app.use(morgan("dev"));
}

/**
 * POST /upload/
 * Upload image to storage and return public URL.
 */
app.post("/upload/", (req, res) => {
  upload(req, res, async function (err) {
    // Handle errors from Multer
    if (err) {
      return res.status(400).end(err.message);
    }

    const { originalname, mimetype, buffer } = req.file;
    const fileName = Date.now();
    // New filename for storage (<timestamp>.<extension>)
    const newImgFullName = `${fileName}.${originalname.split(".").at(-1)}`;
    // File content
    const newImgCont = `data:${mimetype};base64,${buffer.toString("base64")}`;
    const newImgRef = ref(getStorage(), newImgFullName);
    
    await uploadString(newImgRef, newImgCont, "data_url")
      .then(async () => {
        res.send({
          fileName,
          publicUrl: await getDownloadURL(newImgRef),
        });
      })
      .catch(() => {
        res.status(409).end("Error while uploading image. Try again.");
      });
  });
});

/**
 * GET /view/<filename>/
 * Find and redirect to actual image via filename slug,
 * otherwise end with suitable status code.
 */
app.get("/view/:filename/", async (req, res) => {
  const foundImgRef = (await listAll(ref(getStorage()))).items.find(
    (item) => item.name.split(".")[0] === req.params.filename
  );

  if (!foundImgRef) {
    return res.status(404).end();
  }

  try {
    res.redirect(await getDownloadURL(foundImgRef));
  } catch {
    res.status(500).end();
  }
});

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
