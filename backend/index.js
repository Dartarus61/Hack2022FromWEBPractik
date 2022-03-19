import express from "express";
import Sequelize, { DataTypes, Model, where } from "sequelize";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import crypto from "crypto";
import CryptoJS from "crypto-js";
dotenv.config();
let __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = new Sequelize("pasdat", "postgres", "postgres", {
  host: process.env.DB_HOST || "localhost",
  port: "5432",
  dialect: "postgres",
  freezeTableName: true,
});
class serv extends Model {}
class dir extends Model {}
try {
  await sequelize.authenticate();
  console.log("Соединение с БД было успешно установлено");
} catch (e) {
  console.log("Невозможно выполнить подключение к БД: ", e);
}

serv.init(
  {
    pass: { type: DataTypes.STRING, allowNull: false },
    login: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, default: "user" },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
  }
);
dir.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
  }
);

export { serv };
//const all = await serv.findOne({ where: { login: "megalogin" } });
//console.log(all.dataValues.pass);

app.get("/api", (req, res) => {
  res.send("ok");
});
app.get("/register", (req, res) => {
  res.send("ok");
});
app.get("/login", (req, res) => {
  res.send("ok");
});

app.listen(PORT, () => {
  console.log(`Server is started on ${PORT}`);
});

const { generateKeyPairSync } = await import("crypto");

const { publicKey, privateKey } = generateKeyPairSync("rsa", {
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
// подтягиваем дату с базы
let data = "сюда приходит данные с формы сайта";
let encrypt = (data) => {
  const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(data));
  return encryptedData;
};
data = encrypt(data);

function add_user(data) {
  const user = await serv.create(
    {
      login: data.login,
      pass: encrypt(data.pas).toString,
    },
    { fields: ["login", "pass"] }
  );
}
var encrypted = CryptoJS.AES.encrypt(privateKey, "secretkey");

console.log(encrypted.toString());
var bytes = CryptoJS.AES.decrypt(encrypted, "secretkey");
var decrypted = bytes.toString(CryptoJS.enc.Utf8);

let decrypt = (data) => {
  const decryptedData = crypto.privateDecrypt(decrypted, data);
  console.log("decrypted data: ", decryptedData.toString());
  return decryptedData;
};

decrypt(data);
function add_der() {}
