import express from "express";
import Sequelize, { DataTypes, Model } from "sequelize";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import crypto from "crypto";
import CryptoJS from "crypto-js";
import { readFile, writeFile } from "fs/promises";

dotenv.config();
let __dirname = path.resolve();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;
const sequelize = new Sequelize("pasdat", "postgres", "postgres", {
  host: process.env.DB_HOST || "localhost",
  port: "5432",
  dialect: "postgres",
  freezeTableName: true,
});
try {
  await sequelize.authenticate();
  console.log("Соединение с БД было успешно установлено");
} catch (e) {
  console.log("Невозможно выполнить подключение к БД: ", e);
}
class User extends Model {}
User.init(
  {
    login: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  },
  {
    sequelize, // Экземпляр подключения (обязательно)
    modelName: "User",
    timestamps: false,
  }
);
await sequelize.sync({ alter: true });
app.post("/login", async (req, res) => {
  let data = req.body;
  console.log(data);
  let keyPuv;
  const promise = readFile(
    path.resolve(__dirname, "backend", "person", "private_key.txt"),
    { flag: "r+", encoding: "utf-8" }
  );
  await promise.then((data) => {
    keyPuv = data;
  });
  try {
    var bytes = CryptoJS.AES.decrypt(keyPuv, data.secretWord);
    var decrypted = bytes.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    console.log("word is wrong");
    res.send("secret word is wrong");
  }
  const rprom = readFile(
    path.resolve(__dirname, "backend", "person", `${data.login}`, "data.txt"),
    { flag: "r+", encoding: "utf-8" }
  );
  let logi;
  await rprom.then((data) => {
    logi = JSON.parse(data);
    console.log(logi);
  });
  let decrypt = (data) => {
    const decryptedData = crypto.privateDecrypt(
      decrypted,
      Buffer.from(data, "hex")
    );
    console.log("decrypted data: ", decryptedData.toString());
    return decryptedData;
  };
  console.log(decrypt(logi.password));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/register", async (req, res) => {
  console.log(req.body);
  delete req.body.repeatPassword;
  let data = req.body;
  /* try {
    const captain = await User.findOne({ Where: { login: `${data.login}` } });
  } catch (e) {
    res.send("418 error");
  } 
  if (captain != null) res.send("418 error");*/
  let keyPuv;
  const promise = readFile(
    path.resolve(__dirname, "backend", "person", "public_key.txt"),
    { flag: "r+", encoding: "utf-8" }
  );
  await promise.then((data) => {
    keyPuv = data;
  });
  console.log(keyPuv);
  data.password = crypto
    .publicEncrypt(keyPuv, Buffer.from(data.password, "utf-8"))
    .toString("hex");

  makeDir(data);
  const wrpromise = writeFile(
    path.join(
      path.resolve(__dirname),
      "backend",
      "person",
      data.login,
      "data.txt"
    ),
    JSON.stringify(data)
  );
  await wrpromise;
  const user = await User.create({
    login: `${data.login}`,
  }).catch((e) => {
    console.log(e);
  });
  res.send("ok");
});
app.get("/api", (req, res) => {
  res.send("ok");
});

app.listen(PORT, () => {
  console.log(`Server is started on ${PORT}`);
});

const makeDir = (data) => {
  return new Promise((res, rej) => {
    fs.mkdir(
      path.join(path.resolve(__dirname), "backend", "person", data.login),
      () => {
        res("ok");
      }
    );
  });
};

/* const { generateKeyPairSync } = await import("crypto"); */

/* const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});
fs.writeFile(
  path.join(path.resolve(__dirname), "backend", "person", "public_key.txt"),
  publicKey,
  () => {
    console.log("ok");
  }
);
var encrypted = CryptoJS.AES.encrypt(privateKey, "hackathon").toString();
fs.writeFile(
  path.join(path.resolve(__dirname), "backend", "person", "private_key.txt"),
  encrypted,
  () => {
    console.log("ok");
  }
); */ //НИКОГДА БОЛЬШЕ НАХУЙ НЕ ТРОГАТЬ

let encrypt = (data) => {
  const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(data));
  return encryptedData;
};
/* let gg = encrypt(data.password);
gg = gg.toString("hex"); // здесь кинуть в бд

var encrypted = CryptoJS.AES.encrypt(privateKey, "hackathon");
сначала две строки для расшифровки приват кода
var bytes = CryptoJS.AES.decrypt(encrypted.toString(), "hackathon");
var decrypted = bytes.toString(CryptoJS.enc.Utf8);
потом дешифруй пароль из папки и сверяй с полученным
let decrypt = (data) => { 
  const decryptedData = crypto.privateDecrypt(decrypted, data);
  console.log("decrypted data: ", decryptedData.toString());
  return decryptedData;
};
gg = Buffer.from(gg, "hex");
decrypt(gg); */
